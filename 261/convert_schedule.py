import pandas as pd
import json
import re
import sys
import os
from datetime import datetime

def parse_time_range(time_str):
    # Returns start_minutes, end_minutes
    # time_str example: "8:00 - 9:20 am" or "10:50 - 12:10 pm"
    
    clean_str = time_str.lower().strip()
    is_pm = 'pm' in clean_str
    
    # Remove am/pm
    clean_str = clean_str.replace('am', '').replace('pm', '').strip()
    
    parts = clean_str.split('-')
    if len(parts) != 2:
        return 0, 0
        
    start_s, end_s = parts[0].strip(), parts[1].strip()
    
    def to_minutes(t_s, context_pm):
        if ':' not in t_s: return 0
        h, m = map(int, t_s.split(':'))
        
        if context_pm:
            # If context is PM (i.e. the range ends in PM)
            # Heuristic based on the schedule provided:
            # 8, 9, 10, 11 -> AM
            # 12, 1, 2, 3, 4, 5 -> PM
            if h != 12 and h < 8:
                h += 12
            elif h == 12:
                pass # 12 PM is 12
            # else 8,9,10,11 stay as is (AM)
        else:
            # AM context
            if h == 12: h = 0
            
        return h * 60 + m

    end_min = to_minutes(end_s, is_pm)
    start_min = to_minutes(start_s, is_pm)
    
    return start_min, end_min

def format_time_range(start_min, end_min):
    def to_str(mins):
        h = mins // 60
        m = mins % 60
        suffix = "am"
        if h >= 12:
            suffix = "pm"
        
        if h > 12:
            h -= 12
        elif h == 0:
            h = 12
        return f"{h}:{m:02d}", suffix

    s_str, s_suff = to_str(start_min)
    e_str, e_suff = to_str(end_min)
    
    # Format: "8:00 - 9:20 am"
    return f"{s_str} - {e_str} {e_suff}"

def parse_schedule(file_path, target_courses):
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return

    try:
        df = pd.read_excel(file_path, header=None)
    except Exception as e:
        print(f"Error reading Excel file: {e}")
        return

    # Pre-process target courses for case-insensitive matching
    # We keep a map of lower_case -> original_requested_code to use in JSON key
    course_map = {c.strip().lower(): c.strip() for c in target_courses}
    target_courses_lower = list(course_map.keys())
    
    # Dictionary to store results: course_code_lower -> list of entries
    results = {code: [] for code in target_courses_lower}

    current_day = None
    time_map = {} # col_index -> time_string

    # Iterate through rows
    for index, row in df.iterrows():
        row_values = [str(val).strip() for val in row.values]
        
        # 1. Detect Day (Column 0)
        col0_val = row_values[0]
        day_names = ["sun", "mon", "tue", "wed", "thu", "sat", "fri"]
        # Check if it contains a day name, is short, and is NOT "Day /Time"
        if (any(d in col0_val.lower() for d in day_names) 
            and len(col0_val) < 20 
            and "day /time" not in col0_val.lower()):
            
            # Clean day string: remove brackets
            current_day = col0_val.strip("()")
            # print(f"Found day at row {index}: {current_day}")

        # 2. Detect Header Row
        # Check if any cell contains "8:00" or "am" or "pm" and looks like a time range
        time_cells = 0
        temp_time_map = {}
        for col_idx, val in enumerate(row_values):
            # Skip Col 0
            if col_idx == 0: continue
            
            # Match patterns like "8:00 - 9:20" or "8:00-9:20"
            if re.search(r'\d{1,2}:\d{2}\s*-\s*\d{1,2}:\d{2}', val):
                time_cells += 1
                temp_time_map[col_idx] = val
        
        if time_cells >= 2: # Threshold to identify header row
            time_map = temp_time_map
            # print(f"Found header at row {index}")
            continue 

        # 3. Process Data Cells
        if not current_day:
            continue

        for col_idx in range(1, len(row)): # Start from Col 1
            time_slot = None
            
            if col_idx in time_map:
                time_slot = time_map[col_idx]
            elif "thu" in current_day.lower() and col_idx == 7:
                # Special case for Thursday column 7 (missing header)
                time_slot = "4:30 - 5:50 pm"
            
            if not time_slot:
                continue
            
            cell_content = str(row[col_idx]).strip()
            if cell_content.lower() == 'nan' or cell_content == '':
                continue
            
            # Check if any target course is in this cell
            cell_lower = cell_content.lower()
            cell_lower_nospaces = cell_lower.replace(" ", "")
            
            for course_lower in target_courses_lower:
                course_lower_nospaces = course_lower.replace(" ", "")
                
                # Handle BBS alias (maps to BLL only)
                search_terms = [course_lower, course_lower_nospaces]
                if course_lower.startswith("bbs"):
                    suffix = course_lower[3:].strip()
                    # search_terms.append(f"bus {suffix}")
                    # search_terms.append(f"bus{suffix}")
                    search_terms.append(f"bll {suffix}")
                    search_terms.append(f"bll{suffix}")

                # Check if any search term is in cell
                match_found = False
                for term in search_terms:
                    term_nospaces = term.replace(" ", "")
                    # 1. Exact substring match
                    if term in cell_lower or term_nospaces in cell_lower_nospaces:
                        match_found = True
                        break
                    
                    # 2. Split-part match (e.g. "bll 1101" matches "bll / ... 1101")
                    if " " in term:
                        parts = term.split()
                        # Check if all parts exist in cell_lower
                        if all(part in cell_lower for part in parts):
                             match_found = True
                             break
                
                if match_found:
                    # Found a match!
                    # Parse the cell
                    section, room, faculty = parse_cell(cell_content)
                    
                    # Day Override Logic
                    actual_day = current_day
                    override_match = re.search(r'\(\s*([SMTW])\s*\)', faculty, re.IGNORECASE)
                    if override_match:
                        code = override_match.group(1).upper()
                        if code == 'S': actual_day = "Sunday"
                        elif code == 'M': actual_day = "Monday"
                        elif code == 'T': actual_day = "Tuesday"
                        elif code == 'W': actual_day = "Wednesday"
                    
                    # Add to results
                    entry = {
                        "section": section,
                        "room": room,
                        "faculty": faculty,
                        "day": actual_day,
                        "time_str": time_slot
                    }
                    results[course_lower].append(entry)

    # Post-process: Merge and Write JSON files
    failed_courses = []
    for course_lower, entries in results.items():
        # 1. Parse times
        for e in entries:
            s, end = parse_time_range(e["time_str"])
            e["start_min"] = s
            e["end_min"] = end
            
        # 2. Sort by Section, Day, Start Time
        entries.sort(key=lambda x: (x["section"], x["day"], x["start_min"]))
        
        # 3. Merge Logic
        merged_entries = []
        if entries:
            current = entries[0]
            for i in range(1, len(entries)):
                next_entry = entries[i]
                
                gap = next_entry["start_min"] - current["end_min"]
                
                if (current["section"] == next_entry["section"] and 
                    current["day"] == next_entry["day"] and 
                    0 <= gap <= 5):
                    
                    # Merge
                    current["end_min"] = max(current["end_min"], next_entry["end_min"])
                    current["time_str"] = format_time_range(current["start_min"], current["end_min"])
                else:
                    merged_entries.append(current)
                    current = next_entry
            merged_entries.append(current)
        
        # 4. Convert back to list format
        final_data = []
        for e in merged_entries:
            final_data.append([
                e["section"],
                e["room"],
                e["faculty"],
                e["day"],
                e["time_str"]
            ])

        original_code = course_map[course_lower]
        safe_filename = re.sub(r'[\\/*?:"<>|]', "_", original_code) + ".json"
        
        if not final_data:
            failed_courses.append(original_code)
            if os.path.exists(safe_filename):
                os.remove(safe_filename)
                # print(f"Deleted empty file: {safe_filename}")
            continue

        output = {original_code: final_data}
        with open(safe_filename, 'w') as f:
            json.dump(output, f, indent=2)
        print(f"Created {safe_filename}")

    if failed_courses:
        print("\nFailed to find schedule for the following courses:")
        for code in failed_courses:
            print(f"- {code}")

def parse_cell(content):
    # Expected format: Course - Section - Room - Faculty
    # User: "before PA or PB or PC or PD is room no. before room no is section no, before section no is course code! and after room no is faculty name!"
    
    # Strategy 1: Split by " - " (space dash space)
    parts = [p.strip() for p in content.split(' - ')]
    parts = [p for p in parts if p]
    
    if len(parts) >= 4:
        faculty = parts[-1]
        room = parts[-2]
        section = parts[-3]
        return section, room, faculty
    
    # Strategy 2: Regex for Room
    # Room pattern: PA/PB/PC/PD followed by digits. Also handling "109" case if needed, but let's stick to PA-PD for now as per user description.
    # User said: "before PA or PB or PC or PD is room no" -> This implies the room starts with PA/PB/PC/PD.
    match = re.search(r'\b(PA|PB|PC|PD|109)\s*\d+\b', content, re.IGNORECASE)
    if match:
        room = match.group(0)
        start, end = match.span()
        
        # Faculty is after room
        faculty_part = content[end:].strip()
        # Remove leading " - " or "-"
        faculty = re.sub(r'^[\s-]*', '', faculty_part)
        
        # Course+Section is before room
        pre_room = content[:start].strip()
        # Remove trailing " - " or "-"
        pre_room = re.sub(r'[\s-]*$', '', pre_room)
        
        # Extract Section from pre_room
        # Usually separated by "-" from course code
        # We take the last part after splitting by "-"
        if '-' in pre_room:
            # Split by last dash
            course_part, section_part = pre_room.rsplit('-', 1)
            section = section_part.strip()
        else:
            section = "Unknown"
            
        return section, room, faculty

    # Fallback for Strategy 1 if Regex failed (e.g. Room didn't match pattern)
    if len(parts) == 3:
        faculty = parts[-1]
        room = parts[-2]
        course_part = parts[0]
        if '-' in course_part:
            section = course_part.rsplit('-', 1)[-1].strip()
        else:
            section = "Unknown"
        return section, room, faculty

    return "Unknown", "Unknown", content

if __name__ == "__main__":
    # List of courses to process
    courses_to_search = []
    
    # Check if arguments are provided via command line
    if len(sys.argv) > 1:
        courses_to_search = sys.argv[1:]
    else:
        # Prompt user for input
        print("--- Interactive Mode ---")
        print("If you cannot type below, you are likely in the Read-Only 'Output' tab.")
        print("Please run this in the Terminal (Right-click -> Run Python File in Terminal).")
        
        try:
            user_input = input("Enter course codes separated by commas (e.g., CSE 2201, CSE 2101): ")
            if user_input.strip():
                courses_to_search = [c.strip() for c in user_input.split(',')]
            else:
                print("No course codes entered. Exiting.")
                sys.exit()
        except EOFError:
            print("\n\n[ERROR] Could not read input (EOFError).")
            print("You are likely running this in a non-interactive environment (like the Output tab).")
            print("Please switch to the Terminal tab or use 'Run Python File in Terminal'.")
            sys.exit(1)
        except OSError:
            print("\n\n[ERROR] Input not supported in this environment.")
            sys.exit(1)
        
    file_path = "Class Schedule For Spring 2026 (UG) 27-11-25.xlsx"
    parse_schedule(file_path, courses_to_search)
