(function () {
  "use strict"; 



const COURSE_DATA = {
  // =================================================================================
  // --- BBA (Bachelor of Business Administration) ---
  // =================================================================================
  // --- Term 1 (Freshman / 261011..) ---
  "BUS 1101": "Introduction to Business",
  "0410-011-1101": "Introduction to Business",
  "GEF 1101": "Academic English I",
  "0231-000-1101": "Academic English I",
  "ELL 0099": "Remedial English",
  "0231-000-0099": "Remedial English",
  "UCC 1101": "Bangla Bhasha O Shahitya",
  "0232-000-1101": "Bangla Bhasha O Shahitya",
  "MAT 0099": "Remedial Math/Basic Math",
  "0541-011-0099": "Remedial Math/Basic Math",
  "ESK 1110": "Study Skills",
  "0031-000-1110": "Study Skills",

  // --- Term 2 (253011..) ---
  "BUS 1201": "Business Mathematics",
  "0488-011-1201": "Business Mathematics",
  "GEF 1201": "Academic English II",
  "0231-000-1201": "Academic English II",
  "UCC 1201": "History of the Emergence of Independent Bangladesh",
  "0222-000-1201": "History of the Emergence of Independent Bangladesh",
  "ESK 1111": "Healthy Life Skills",
  "0031-000-1111": "Healthy Life Skills",

  // --- Term 3 (252011..) ---
  "BUS 2101": "Business Statistics I",
  "0542-011-2101": "Business Statistics I",
  "BUS 2103": "Principles of Management",
  "0413-011-2103": "Principles of Management",
  "UCC 1202": "Ethics",
  "0223-000-1202": "Ethics",
  "ESK 1112": "Social Skills",
  "0031-000-1112": "Social Skills",

  // --- Term 4 (251011..) ---
  "BUS 2201": "Business Statistics II",
  "0542-011-2201": "Business Statistics II",
  "BUS 2202": "Business Communication",
  "0231-011-2202": "Business Communication",
  "SSC 2158": "Principles of Economics",
  "0503-000-2158": "Principles of Economics",
  "ECO 4601": "Principles of Economics", // Alias for SSC 2158
  "ESK 1113": "Professional Skills",
  "0031-000-1113": "Professional Skills",

  // --- Term 5 (243011..) ---
  "BUS 1301": "Financial Accounting",
  "0411-011-1301": "Financial Accounting",
  "BUS 2301": "Marketing Management",
  "0414-011-2301": "Marketing Management",
  "BUS 2302": "Organizational Behavior",
  "0413-011-2302": "Organizational Behavior",

  // --- Term 6 (242011..) ---
  "BUS 2203": "Business and Legal Environment",
  "0410-011-2203": "Business and Legal Environment",
  "BUS 3201": "Human Resource Management",
  "0413-011-3201": "Human Resource Management",
  "BUS 3203": "Management Information System and E-Commerce",
  "0415-011-3203": "Management Information System and E-Commerce",

  // --- Term 7 (241011..) ---
  "BUS 3101": "Cost & Management Accounting",
  "0411-011-3101": "Cost & Management Accounting",
  "BUS 3102": "Entrepreneurship",
  "0413-011-3102": "Entrepreneurship",
  "BUS 3103": "Financial Management",
  "0412-011-3103": "Financial Management",

  // --- Term 8 (233011..) ---
  "BUS 3202": "Operation Management",
  "0413-011-3202": "Operation Management",
  "BUS 4101": "Research Methodology",
  "0410-011-4101": "Research Methodology",
  "BUS 4102": "Integrated Marketing Communication",
  "0414-011-4102": "Integrated Marketing Communication",

  // --- Term 9 (232011..) ---
  "BUS 4201": "International Business",
  "0410-011-4201": "International Business",
  "BUS 4202": "Total Quality Management",
  "0413-011-4202": "Total Quality Management",
  "BUS 4203": "Project Management",
  "0413-011-4203": "Project Management",

  // --- Term 10 (231011..) ---
  "BUS 4301": "Strategic Management",
  "0410-011-4301": "Strategic Management",

  // --- Term 12 (222011..) ---
  "BUS 499": "Internship",

  // --- BBA Minor in Business (For other departments) ---
  "BUS 2103 (Minor)": "Principles of Management",
  "BUS 1201 (Minor)": "Business Mathematics",
  "BUS 2302 (Minor)": "Organizational Behavior",
  "BUS 2202 (Minor)": "Business Communication",
  "BUS 1301 (Minor)": "Financial Accounting",
  "BUS 2203 (Minor)": "Business and Legal Environment",
  "BUS 2301 (Minor)": "Marketing Management",
  "BUS 3102 (Minor)": "Entrepreneurship",

  // =================================================================================
  // --- MSJ (Media Studies and Journalism) ---
  // =================================================================================
  // --- Freshman (261012...) ---
  "MSJ 1101": "Communication Concepts and Theories",
  "0321-012-1101": "Communication Concepts and Theories",
  "GEF 1101 (MSJ)": "Academic English I",
  "ELL 0099 (MSJ)": "Remedial English",
  "UCC 1101 (MSJ)": "Bangla Bhasha O Shahitya",
  "ESK 1110 (MSJ)": "Study Skills",

  // --- Term 2 (253012..) ---
  "MSJ 1201": "Communication Research",
  "0321-012-1201": "Communication Research",
  "GEF 1201 (MSJ)": "Academic English II",
  "UCC 1201 (MSJ)": "History of Emergence of Independent Bangladesh",
  "ESK 1111 (MSJ)": "Healthy Life Skills",
  "GEF 1202": "Advanced English Writing Skills",
  "0231-000-1202": "Advanced English Writing Skills",

  // --- Term 3 (252012..) ---
  "MSJ 2101": "Reporting and Editing",
  "0321-012-2101": "Reporting and Editing",
  "MSJ 2102": "Visual Communication",
  "0321-012-2102": "Visual Communication",
  "MSJ 2103": "Bangla for Media",
  "0232-012-2103": "Bangla for Media",
  "UCC 1202 (MSJ)": "Ethics",
  "ESK 1112 (MSJ)": "Social Skills",

  // --- Term 4 (251012..) ---
  "MSJ 2201": "Introduction to Public Relations",
  "0321-012-2201": "Introduction to Public Relations",
  "MSJ 2202": "Mass Communication Theories",
  "0321-012-2202": "Mass Communication Theories",
  "MSJ 2203": "Media Production Workshop",
  "0321-012-2203": "Media Production Workshop",
  "ESK 1113 (MSJ)": "Professional Skills",

  // --- Term 5 (243012..) ---
  "MSJ 3101": "Digital and Online Media",
  "0321-012-3101": "Digital and Online Media",
  "MSJ 3102": "Development Communication",
  "MSJ 3103": "Public Relations Techniques",
  "0321-012-3103": "Public Relations Techniques",
  "MSJ 3104": "Media Economics",
  "0321-012-3104": "Media Economics",

  // --- Term 6 (242012..) ---
  "MSJ 3201": "Feature Writing",
  "0321-012-3201": "Feature Writing",
  "MSJ 3202": "Photojournalism",
  "0321-012-3202": "Photojournalism",
  "MSJ 3203": "Gender and Media",
  "0321-012-3203": "Gender and Media",
  "MSJ 3204": "Media Literacy and Education",
  "0321-012-3204": "Media Literacy and Education",

  // --- Term 7 (241012..) ---
  "MSJ 4101": "Advanced Research Methods",
  "0321-012-4101": "Advanced Research Methods",
  "MSJ 4102": "Specialized Reporting",
  "0321-012-4102": "Specialized Reporting",
  "MSJ 4103": "Global Media and Communication",
  "0321-012-4103": "Global Media and Communication",
  "MSJ 4104": "Advanced Editing and Layout",
  "0321-012-4104": "Advanced Editing and Layout",

  // --- Term 8 (233012..) ---
  "MSJ 4201": "Media Management",
  "0321-012-4201": "Media Management",
  "MSJ 4202": "Media Ethics",
  "0321-012-4202": "Media Ethics",
  "MSJ 4203": "Contemporary Journalism",
  "0321-012-4203": "Contemporary Journalism",
  "MSJ 4204": "Digital Media Strategies",
  "0321-012-4204": "Digital Media Strategies",

  // --- Term 9 (232012..) ---
  "MSJ 4301": "Media Law and Policy",
  "MSJ 4302": "Campaign Communication",
  "MSJ 4303": "Television Journalism",
  "MSJ 4304": "Online Journalism",

  // --- Term 10 (231012..) ---
  "MSJ 4151": "Investigative Journalism-I",
  "MSJ 4131": "Documentary Production",
  "MSJ 4141": "Advertising",
  "MSJ 4161": "Entertainment Education Communication",
  "MSJ 4107": "Development Communication",

  // --- Term 11 (223012..) ---
  "MSJ 4101 (T11)": "Media and the Law",
  "MSJ 4102 (T11)": "Ethics in Media and Communication",

  // --- Term 12 (222012..) ---
  "MSJ 4298": "Internship/Portfolio",
  "MSJ 4299": "Internship/Portfolio",

  // --- MSJ Elective/Minor/GED Cross coded courses ---
  "MSJ 2101 (Cross)": "Communication and Technology",
  "MSJ 2251": "Journalism and Society",
  "MSJ 2252": "Digital Audience",
  "MSJ 11203": "Communication and Technology",

  // =================================================================================
  // --- ENG (Bachelor of Arts in English) ---
  // =================================================================================
  // --- Term 1 (Freshman / 261013..) ---
  "ENG 1101": "Introduction to Literary Genres",
  "0232-013-1101": "Introduction to Literary Genres",
  "GEF 1101 (ENG)": "Academic English I",
  "ELL 0099 (ENG)": "Remedial English",
  "UCC 1101 (ENG)": "Bangla Bhasha O Shahitya",
  "ESK 1110 (ENG)": "Study Skills",

  // --- Term 2 (253013..) ---
  "ENG 1201": "Introduction to Poetry and Drama",
  "0232-013-1201": "Introduction to Poetry and Drama",
  "GEF 1201 (ENG)": "Academic English II",
  "UCC 1201 (ENG)": "History of the Emergence of Independent Bangladesh",
  "ESK 1111 (ENG)": "Healthy Life Skills",

  // --- Term 3 (252013..) ---
  "ENG 2101": "Introduction to Fiction and Non-Fiction",
  "ENG 11202": "Introduction to Fiction and Non-Fiction", // Old code
  "UCC 1202 (ENG)": "Ethics",
  "ESK 1112 (ENG)": "Social Skills",
  "ENG 2102": "Literary Criticism and Theory",
  "ENG 11201": "Literary Criticism and Theory", // Old code

  // --- Term 4 (251013..) ---
  "ENG 2201": "Introduction to Linguistics",
  "ENG 11204": "Introduction to Linguistics", // Old code
  "ENG 2202": "Advanced English Writing Skills",
  "ENG 11203": "Advanced English Writing Skills", // Old code
  "ESK 1113 (ENG)": "Professional Skills",

  // --- Term 5 (243013..) ---
  "ENG 3101": "History of English Literature I (Old English to Romantic)",
  "ENG 11301": "History of English Literature I (Old English to Romantic)", // Old code
  "ENG 3102": "Sociolinguistics",
  "ENG 11302": "Sociolinguistics", // Old code
  "ENG 3103": "Phonetics and Phonology",
  "ENG 11303": "Phonetics and Phonology", // Old code

  // --- Term 6 (242013..) ---
  "ENG 3104": "EFL/ESL Methods and Techniques",
  "ENG 11304": "EFL/ESL Methods and Techniques", // Old code
  "ENG 3201": "History of English Literature II (Victorian to Contemporary)",
  "ENG 11305": "History of English Literature II (Victorian to Contemporary)", // Old code
  "ENG 3202": "Morphology and Syntax",
  "ENG 11306": "Morphology and Syntax", // Old code

  // --- Term 7 (241013..) ---
  "ENG 3203": "Discourse Analysis",
  "ENG 11307": "Discourse Analysis", // Old code
  "ENG 3204": "Literary Research Methods",
  "ENG 11308": "Literary Research Methods", // Old code
  "ENG 3108": "South Asian Literature in English (Concentration Core for Literature and Cultural Studies)",
  "ENG 4112": "Classical and Modern Drama (Concentration Core for Literature and Cultural Studies)",
  "ENG 3217": "Psycholinguistics (Concentration Core for Applied Linguistics and TESOL)",
  "ENG 4106": "English Language Skills (Concentration Core for Applied Linguistics and TESOL)",

  // --- Term 8 (233013..) ---
  "ENG 4113": "Modern Poetry (Concentration Elective for Literature and Cultural Studies)",
  "ENG 4103": "Semantics and Pragmatics (Concentration Elective for Applied Linguistics and TESOL)",
  "ENG 4104": "Second Language Acquisition (Concentration Elective for Applied Linguistics and TESOL)",

  // --- Term 9 (232013..) ---
  "ENG 4114": "American Literature (Concentration Elective for Literature and Cultural Studies)",
  "ENG 4116": "Myth and Folklore in Literature (Concentration Elective for Literature and Cultural Studies)",
  "ENG 4102": "Testing and Evaluation (Concentration Elective for Applied Linguistics and TESOL)",
  "ENG 4105": "Literacy and Cultural Studies (Concentration Elective for Literature and Cultural Studies)",
  "ENG 3212": "Methodology of English Language Teaching (Concentration Elective for Applied Linguistics and TESOL)",
  "ENG 4108": "Critical Literacy and Technology (Concentration Elective for Applied Linguistics and TESOL)",

  // --- Term 10 (231013..) ---
  "ENG 4101": "Research Methodology",
  "ENG 3205": "Postcolonial Theories and Literature (Concentration Elective for in Literature and Cultural Studies)",
  "ENG 4201": "Gender Theory and Literature (Concentration Elective for Literature and Cultural Studies)",
  "ENG 4107": "Syllabus Design and Material Development (Concentration Elective for Applied Linguistics and TESOL)",
  "ENG 4117": "Teaching Young Learners (Concentration Elective for Applied Linguistics and TESOL)",

  // --- Term 11 (223013..) ---
  "ENG 4111": "Eastern Classics in Translation (Concentration Elective for in Literature and Cultural Studies)",
  "ENG 4206": "Teaching Practicum (Concentration Elective for Applied Linguistics and TESOL)",

  // --- Term 12 (222013..) ---
  "ENG 4299": "Dissertation/Internship",
  "ENG 4298": "Dissertation/Internship",
  "ENG 435": "Dissertation/Internship", // Old code

  // =================================================================================
  // --- CSE (Bachelor of Science in Computer Science and Engineering) ---
  // =================================================================================
  // --- Freshman (261014..) ---
  "MAT 1103": "Calculus and Differential Equation",
  "0541-014-1103": "Calculus and Differential Equation",
  "CSE 1102": "Introduction to Programming",
  "0613-014-1102": "Introduction to Programming",
  "PHY 1101": "Physics 1",
  "0533-014-1101": "Physics 1",
  "PHY 1102": "Physics 1 Lab",
  "0533-014-1102": "Physics 1 Lab",
  "GEF 1101 (CSE)": "Academic English I",
  "ELL 0099 (CSE)": "Remedial English",
  "ESK 1110 (CSE)": "Study Skills",

  // --- Term 2 (253014..) ---
  "CSE 1201": "Structured Programming",
  "0613-014-1201": "Structured Programming",
  "CSE 1202": "Structured Programming Lab",
  "0613-014-1202": "Structured Programming Lab",
  "CSE 1203": "Electrical Circuit Analysis",
  "0613-014-1203": "Electrical Circuit Analysis",
  "MAT 1203": "Discrete Mathematics",
  "0541-014-1203": "Discrete Mathematics",
  "GEF 1201 (CSE)": "Academic English II",
  "ESK 1111 (CSE)": "Healthy Life Skills",

  // --- Term 3 (252014..) ---
  "CSE 2101": "Digital Logic Design",
  "0613-014-2101": "Digital Logic Design",
  "CSE 2102": "Digital Logic Design Lab",
  "0613-014-2102": "Digital Logic Design Lab",
  "CSE 2103": "Electronic Devices and Circuits",
  "0613-014-2103": "Electronic Devices and Circuits",
  "CSE 2104": "Electronic Devices and Circuits Lab",
  "0613-014-2104": "Electronic Devices and Circuits Lab",
  "MAT 2103": "Linear Algebra",
  "0541-014-2103": "Linear Algebra",
  "UCC 1201 (CSE)": "History of the Emergence of Independent Bangladesh",
  "ESK 1112 (CSE)": "Social Skills",

  // --- Term 4 (251014..) ---
  "CSE 2201": "Data Structures",
  "0613-014-2201": "Data Structures",
  "CSE 2202": "Data Structures Lab",
  "0613-014-2202": "Data Structures Lab",
  "CSE 2203": "Object-Oriented Programming (OOP)",
  "0613-014-2203": "Object-Oriented Programming (OOP)",
  "CSE 2204": "Object-Oriented Programming Lab (OOP Lab)",
  "0613-014-2204": "Object-Oriented Programming Lab (OOP Lab)",
  "UCC 1202 (CSE)": "Ethics",
  "ESK 1113 (CSE)": "Professional Skills",

  // --- Term 5 (243014..) ---
  "CSE 3101": "Algorithm",
  "0613-014-3101": "Algorithm",
  "CSE 3102": "Algorithm Lab",
  "0613-014-3102": "Algorithm Lab",
  "CSE 3103": "Database Management System",
  "0613-014-3103": "Database Management System",
  "CSE 3104": "Database Management System Lab",
  "0613-014-3104": "Database Management System Lab",
  "MAT 3103": "Probability and Statistics",
  "0541-014-3103": "Probability and Statistics",
  "HUM 2201 (CSE)": "Bangla Bhasha O Shahitya",

  // --- Term 6 (242014..) ---
  "CSE 3201": "Theory of Computation",
  "0613-014-3201": "Theory of Computation",
  "CSE 3203": "Operating System",
  "0613-014-3203": "Operating System",
  "CSE 3204": "Operating System Lab",
  "0613-014-3204": "Operating System Lab",
  "CSE 3205": "Compiler Design",
  "0613-014-3205": "Compiler Design",
  "CSE 3206": "Compiler Design Lab",
  "0613-014-3206": "Compiler Design Lab",
  "HUM 2203 (CSE)": "Development Economics",

  // --- Term 7 (241014..) ---
  "CSE 4101": "Computer Architecture",
  "0613-014-4101": "Computer Architecture",
  "CSE 4102": "Computer Architecture Lab",
  "0613-014-4102": "Computer Architecture Lab",
  "CSE 4103": "Computer Network",
  "0613-014-4103": "Computer Network",
  "CSE 4104": "Computer Network Lab",
  "0613-014-4104": "Computer Network Lab",
  "BUS 4101 (CSE)": "Industrial Management",
  "CSE 4455": "Machine Learning",
  "CSE 4456": "Machine Learning Lab",
  "CSE 4411": "Cloud Computing",
  "CSE 4412": "Cloud Computing Lab",

  // --- Term 8 (233014..) ---
  "CSE 4201": "Software Engineering",
  "0613-014-4201": "Software Engineering",
  "CSE 4202": "Software Engineering Lab",
  "0613-014-4202": "Software Engineering Lab",
  "CSE 4203": "Artificial Intelligence",
  "0613-014-4203": "Artificial Intelligence",
  "CSE 4204": "Artificial Intelligence Lab",
  "0613-014-4204": "Artificial Intelligence Lab",
  "BUS 4103 (CSE)": "Technology Management",
  "CSE 4457": "Deep Learning",
  "CSE 4458": "Deep Learning Lab",
  "CSE 4413": "Distributed System",
  "CSE 4414": "Distributed System Lab",
  "CSE 4459": "Big data analytics",
  "CSE 4460": "Big data analytics lab.",
  "CSE 4417": "Internet of Things",
  "CSE 4418": "Internet of Things Lab",

  // --- Term 9 (232014..) ---
  "CSE 3301": "Cyber Security",
  "CSE 433": "Cyber Security", // Old/Alias code
  "CSE 2305": "Cyber Security", // Old/Alias code
  "CSE 2306": "Cyber Security Lab",
  "CSE 4098A": "Capstone Project I",
  "CSE 4461": "Digital Image Processing",
  "CSE 4462": "Digital Image Processing Lab",
  "CSE 4463": "Introduction to Bioinformatics",
  "CSE 4464": "Introduction to Bioinformatics Lab",

  // --- Term 10 (231014..) ---
  "CSE 4419": "Network Security",
  "CSE 4421": "Wireless and Cellular Communication",
  "CSE 4098B": "Capstone Project 2",
  "CSE 4465": "Natural Language Processing",

  // --- Term 11 (223014..) ---
  "CSE 4415": "Data Communication",
  "CSE 4098C": "Capstone Project 3",

  // --- Term 12 (222014..) ---
  "CSE 4099": "Internship",

  // --- CSE Minor Courses for Other Departments ---
  "CSE 1201 (Minor)": "Structured Programming",
  "CSE 1202 (Minor)": "Structured Programming Lab",

  // =================================================================================
  // --- EEE (Bachelor of Science in Electrical and Electronic Engineering) ---
  // =================================================================================
  // --- Term 1 (Freshman / 261016..) ---
  "EEE 1101": "Electrical Circuits I",
  "0713-016-1101": "Electrical Circuits I",
  "EEE 1102": "Electrical Circuits I Lab",
  "0713-016-1102": "Electrical Circuits I Lab",
  "MAT 1101": "Differential & Integral Calculus [for upto 243 batch]",
  "0541-014-1101": "Differential & Integral Calculus [for upto 243 batch]",
  "MAT 1103 (EEE)": "Differential & Integral Calculus [From batch 251 & onward]",
  "0541-014-1103 (EEE)": "Differential & Integral Calculus [From batch 251 & onward]",
  "GEF 1101 (EEE)": "Academic English I",
  "ELL 0099 (EEE)": "Remedial English",
  "ESK 1110 (EEE)": "Study Skills",

  // --- Term 2 (253016..) ---
  "EEE 1203": "Electrical Circuits II",
  "0713-016-1203": "Electrical Circuits II",
  "EEE 1204": "Electrical Circuits II Lab",
  "0713-016-1204": "Electrical Circuits II Lab",
  "PHY 1101 (EEE)": "Physics 1",
  "0533-014-1101 (EEE)": "Physics 1",
  "PHY 1102 (EEE)": "Physics 1 Lab",
  "0533-014-1102 (EEE)": "Physics 1 Lab",
  "MAT 1201 (EEE)": "Calculus and Differential Equation",
  "0541-014-1201 (EEE)": "Calculus and Differential Equation",
  "GEF 1201 (EEE)": "Academic English II",
  "ESK 1111 (EEE)": "Healthy Life Skills",

  // --- Term 3 (252016..) ---
  "EEE 2101": "Electronic Devices I",
  "0713-016-2101": "Electronic Devices I",
  "EEE 2102": "Electronic Devices I Lab",
  "0713-016-2102": "Electronic Devices I Lab",
  "EEE 2103": "Digital Logic Design",
  "0713-016-2103": "Digital Logic Design",
  "EEE 2104": "Digital Logic Design Lab",
  "0713-016-2104": "Digital Logic Design Lab",
  "MAT 2101 (EEE)": "Linear Algebra",
  "0541-014-2101 (EEE)": "Linear Algebra",
  "UCC 1201 (EEE)": "History of the Emergence of Independent Bangladesh",
  "ESK 1112 (EEE)": "Social Skills",

  // --- Term 4 (251016..) ---
  "EEE 2201": "Electronic Devices II",
  "0713-016-2201": "Electronic Devices II",
  "EEE 2202": "Electronic Devices II Lab",
  "0713-016-2202": "Electronic Devices II Lab",
  "EEE 2203": "Electrical Machines",
  "0713-016-2203": "Electrical Machines",
  "EEE 2204": "Electrical Machines Lab",
  "0713-016-2204": "Electrical Machines Lab",
  "UCC 1202 (EEE)": "Ethics",
  "ESK 1113 (EEE)": "Professional Skills",

  // --- Term 5 (243016..) ---
  "EEE 3101": "Signal and Systems",
  "0713-016-3101": "Signal and Systems",
  "EEE 3103": "Digital Signal Processing",
  "0713-016-3103": "Digital Signal Processing",
  "EEE 3104": "Digital Signal Processing Lab",
  "0713-016-3104": "Digital Signal Processing Lab",
  "MAT 3101 (EEE)": "Probability and Statistics",
  "0541-014-3101 (EEE)": "Probability and Statistics",
  "HUM 2201 (EEE)": "Bangla Bhasha O Shahitya",

  // --- Term 6 (242016..) ---
  "EEE 3201": "Power System I",
  "0713-016-3201": "Power System I",
  "EEE 3203": "Electromagnetic Waves and Transmission Lines",
  "0713-016-3203": "Electromagnetic Waves and Transmission Lines",
  "EEE 3205": "Microprocessors and Interfacing",
  "0713-016-3205": "Microprocessors and Interfacing",
  "EEE 3206": "Microprocessors and Interfacing Lab",
  "0713-016-3206": "Microprocessors and Interfacing Lab",
  "HUM 2203 (EEE)": "Development Economics",

  // --- Term 7 (241016..) ---
  "EEE 4101": "Control System",
  "0713-016-4101": "Control System",
  "EEE 4102": "Control System Lab",
  "0713-016-4102": "Control System Lab",
  "EEE 4103": "VLSI Design",
  "0713-016-4103": "VLSI Design",
  "EEE 4104": "VLSI Design Lab",
  "0713-016-4104": "VLSI Design Lab",
  "BUS 4101 (EEE)": "Industrial Management",
  "EEE 3105": "Instrumentation and Measurement",
  "EEE 3106": "Instrumentation and Measurement Lab",
  "EEE 4409": "Optical Fiber Communication",
  "EEE 4410": "Optical Fiber Communication Lab",
  "EEE 4431": "Power System Protection",
  "EEE 4432": "Power System Protection Lab",

  // --- Term 8 (233016..) ---
  "EEE 4201": "Communication Engineering",
  "0713-016-4201": "Communication Engineering",
  "EEE 4202": "Communication Engineering Lab",
  "0713-016-4202": "Communication Engineering Lab",
  "EEE 4203": "Project/Design Study I",
  "EEE 4204": "Project/Design Study I Lab",
  "BUS 4103 (EEE)": "Technology Management",
  "EEE 4411": "Telecommunication Engineering",
  "EEE 4412": "Telecommunication Engineering Lab",
  "EEE 4435": "Power System II",
  "EEE 4436": "Power System II Lab",
  "EEE 4437": "Power Plant Engineering",
  "EEE 4438": "Power Plant Engineering Lab",

  // --- Term 9 (232016..) ---
  "EEE 4205": "Project/Design Study II",
  "EEE 4206": "Project/Design Study II Lab",
  "EEE 4413": "Digital Communication",
  "EEE 4414": "Digital Communication Lab",
  "EEE 4415": "Wireless and Mobile Communication",
  "EEE 4416": "Wireless and Mobile Communication Lab",
  "EEE 4439": "Switchgear and Protection",
  "EEE 4440": "Switchgear and Protection Lab",
  "EEE 4441": "Energy Conservation and Utilization",
  "EEE 4442": "Energy Conservation and Utilization Lab",

  // --- Term 10 (231016..) ---
  "EEE 4207": "Project/Design Study III",
  "EEE 4208": "Project/Design Study III Lab",
  "EEE 4417": "Information Theory and Coding",
  "EEE 4418": "Information Theory and Coding Lab",
  "EEE 4419": "Antennas and Propagation",
  "EEE 4420": "Antennas and Propagation Lab",
  "EEE 4443": "Operation and Control of Power System",
  "EEE 4444": "Operation and Control of Power System Lab",
  "EEE 4445": "Industrial Automation and Control",
  "EEE 4446": "Industrial Automation and Control Lab",

  // --- Term 11 (223016..) ---
  "EEE 4209": "Project/Design Study IV",
  "EEE 4210": "Project/Design Study IV Lab",
  "EEE 4421": "RF and Microwave Engineering",
  "EEE 4422": "RF and Microwave Engineering Lab",
  "EEE 4423": "Radar Engineering",
  "EEE 4424": "Radar Engineering Lab",
  "EEE 4447": "Renewable Energy Technology",
  "EEE 4448": "Renewable Energy Technology Lab",
  "EEE 4449": "High Voltage Engineering",
  "EEE 4450": "High Voltage Engineering Lab",

  // --- Term 12 (222016..) ---
  "EEE 4299": "Internship",

  // --- EEE Concentration Electives (Electronics Group) ---
  "EEE 4403": "Microcontroller and Embedded Systems",
  "EEE 4404": "Microcontroller and Embedded Systems Lab",
  "EEE 4405": "Solid State Devices",
  "EEE 4407": "Optoelectronics",
  "EEE 4408": "Optoelectronics Lab",
  "EEE 4433": "Power Electronics",
  "EEE 4434": "Power Electronics Lab",

  // --- EEE Concentration Electives (Power Group) ---
  "EEE 4467": "High Voltage Engineering",
  "EEE 4468": "High Voltage Engineering Lab",
  "EEE 477": "Renewable Energy Technology (Old Code)",
  "EEE 4477": "Renewable Energy Technology",
  "EEE 4471": "Power System Operation and Control",

  // --- EEE Minor Courses ---
  "EEE 1301": "Electronic Circuits 1",
  "EEE 1205": "Analog Electronics",
  "EEE 2105": "Digital Electronics",
  "EEE 2106": "Digital Electronics Lab",
  "EEE 3107": "Communication Systems",
  "EEE 3108": "Communication Systems Lab",
  "EEE 3207": "Power System Analysis",

  // =================================================================================
  // --- BLL/BBS (Bangla Language and Literature) ---
  // =================================================================================
  // --- Term 1 (Freshman / 261017..) ---
  "BBS 1101": "Socio-Culture and Literature History of Bengal: Ancient and Medieval Period",
  "0020-017-1101": "Socio-Culture and Literature History of Bengal: Ancient and Medieval Period",
  "GEF 1101 (BBS)": "Academic English I",
  "ELL 0099 (BBS)": "Remedial English",
  "UCC 1101 (BBS)": "Bangla Bhasha O Shahitya",
  "ESK 1110 (BBS)": "Study Skills",

  // --- Term 2 (253017...) ---
  "BBS 1201": "An Introduction to Bangla Literature",
  "0200-017-1201": "An Introduction to Bangla Literature",
  "BBS 1202": "Literature in Film",
  "0288-017-1202": "Literature in Film",
  "GEF 1201 (BBS)": "Academic English II",
  "UCC 1201 (BBS)": "History of the Emergence of Independent Bangladesh",
  "ESK 1111 (BBS)": "Healthy Life Skills",

  // --- Term 3 (252017...) ---
  "BBS 2101": "Bangla Poem: From Ancient to Medieval",
  "BBS 2102": "Bangla Short Story: Colonial to Post Liberation",
  "UCC 1202 (BBS)": "Ethics",
  "ESK 1112 (BBS)": "Social Skills",

  // --- Term 4 (251017...) ---
  "BBS 2201": "Bangla Poem: From Post Liberation to Modern Period",
  "BBS 2202": "Bangla Novel: Colonial to Partition Period",
  "ESK 1113 (BBS)": "Professional Skills",

  // --- Term 5 (243017...) ---
  "BBS 2301": "Bangla Drama: From Medieval to Modern",
  "BBS 2302": "Bangla Short Story: Post Liberation to Modern",

  // --- Term 6 (242017...) ---
  "BBS 2303": "Bangla Non Fiction: Origin and Develop",
  "BBS 2304": "Ethnic Language & Literature",

  // --- Term 7 (241017...) ---
  "BBS 3101": "Vernacular and Folk Literature",
  "BBS 3102": "Bangla Poem: Colonial and Liberation Period",
  "BBS 3103": "Epic: Primary & Secondary",

  // --- Term 8 (233017...) ---
  "BBS 3201": "Bangla Novel: Post Partition",
  "BBS 3202": "Applied Linguistic",

  // --- Term 9 (232017...) ---
  "BBS 3301": "Bangladesher Shahitto",
  "BBS 3302": "Literary Criticism",
  "BBS 3303": "World Literature: Latin America, Europe and African",

  // --- Term 10 (231017...) ---
  "BBS 4101": "Comparative Literature",
  "BBS 4102": "Research Methodology",
  "BBS 4103": "Classical Literature: Greek and Roman",

  // --- Term 11 (223017...) ---
  "BBS 4201": "Classical Literature: European",
  "BBS 4202": "Journalism in Bangla Literature",

  // --- Term 12 (222017...) ---
  "BBS 4299": "Internship/Dissertation",

  // --- BLL Old/Cross-listed Courses ---
  "BLL 2102": "GED Tier Course II: Social Sciences",
  "BLL 2201": "Bangla Drama: From Medieval to Modern",
  "BLL 2202": "Bangla Non Fiction: Origin and Develop",


  // =================================================================================
  // --- GED (General Education Department) and Cross-listed Courses ---
  // =================================================================================
  // --- GED Core Courses ---
  "UCC 1101 (GED)": "Bangla Bhasha O Sahitya",
  "0232-000-1101 (GED)": "Bangla Bhasha O Sahitya",
  "UCC 1201 (GED)": "History of the Emergence of Independent Bangladesh",
  "0222-000-1201 (GED)": "History of the Emergence of Independent Bangladesh",
  "UCC 1202 (GED)": "Ethics (USB, MSJ & DEH)",
  "0223-000-1202 (GED)": "Ethics (USB, MSJ & DEH)",
  "GED 2159": "Professional Ethics for SSE",
  "GED 218": "Professional Ethics for SSE",
  "0223-000-2159": "Professional Ethics for SSE",

  // --- Tier I: Arts and Humanities ---
  "HUM 2106": "History of Bangla Literature",
  "0232-000-2106": "History of Bangla Literature",
  "GED 206": "Introduction to Philosophy",
  "HUM 2111": "Introduction to Philosophy",
  "0223-000-2111": "Introduction to Philosophy",
  "GED 201": "World Civilization",
  "HUM 2115": "World Civilization",
  "0314-000-2115": "World Civilization",
  "HUM 2204": "History of Modern South Asia",
  "0222-000-2204": "History of Modern South Asia",
  "HUM 2206": "Introduction to Philosophy II",
  "0223-000-2206": "Introduction to Philosophy II",
  "GED 451": "Art and Culture in Bangladesh",
  "HUM 2214": "Art and Culture in Bangladesh",
  "0232-000-2214": "Art and Culture in Bangladesh",
  "GED 452": "Introduction to World Religions",
  "HUM 3105": "Introduction to World Religions",
  "0223-000-3105": "Introduction to World Religions",
  "GED 453": "World Music",
  "HUM 3205": "World Music",
  "0312-000-3205": "World Music",

  // --- Tier II: Social Sciences ---
  "SSC 2146": "Introduction to Sociology",
  "0388-000-2146": "Introduction to Sociology",
  "SSC 2147": "Anthropology",
  "0388-000-2147": "Anthropology",
  "SSC 2148": "Introduction to Psychology",
  "0388-000-2148": "Introduction to Psychology",
  "SSC 2154": "Introduction to Political Science",
  "0307-000-2154": "Introduction to Political Science",
  "SSC 2155": "Introduction to Economics",
  "0503-000-2155": "Introduction to Economics",
  "SSC 2252": "Introduction to Gender Studies",
  "0388-000-2252": "Introduction to Gender Studies",
  "SSC 2253": "Bangladeshi Society & Culture",
  "0388-000-2253": "Bangladeshi Society & Culture",
  "GED 222": "Development Studies",
  "SSC 3149": "Development Studies",
  "0522-000-3149": "Development Studies",

  // --- Tier III: Natural Sciences ---
  "GED 224": "Introduction to Mathematics",
  "NSC 2181": "Introduction to Mathematics",
  "0541-000-2181": "Introduction to Mathematics",
  "GED 225": "Introduction to Statistics",
  "NSC 2281": "Introduction to Statistics",
  "0542-000-2281": "Introduction to Statistics",
  "GED 226": "Introduction to Environmental Science",
  "NSC 2282": "Introduction to Environmental Science",
  "0522-000-2282": "Introduction to Environmental Science",
  "GED 227": "Biodiversity and Nature Conservation",
  "NSC 2283": "Biodiversity and Nature Conservation",
  "0522-000-2283": "Biodiversity and Nature Conservation",
  "GED 228": "Organic Farming/Sustainable Agriculture",
  "NSC 2185": "Organic Farming/Sustainable Agriculture",
  "0811-000-2185": "Organic Farming/Sustainable Agriculture",
  "SSC 2254": "Natural Hazard and Disaster Management",
  "0522-000-2254": "Natural Hazard and Disaster Management",
  "NSC 2184": "Renewable Energy",
  "0712-000-2184": "Renewable Energy",

  // --- Minor in South Asian Studies ---
  "HUM 2107": "History of Pre-Modern South Asia",
  "0222-000-2107": "History of Pre-Modern South Asia",
  "HUM 2204 (Minor)": "History of Modern South Asia",
  "HUM 2213": "Peoples, Culture and Language",
  "0230-000-2213": "Peoples, Culture and Language",
  "HUM 3206": "South Asian Art and Architecture",
  "0213-000-3206": "South Asian Art and Architecture",
  "HUM 4107": "The Visual Culture of South Asian Women",
  "0321-000-4107": "The Visual Culture of South Asian Women",

  // --- Other GED Cross-listed Courses ---
  "GED 467": "Seminar on Grassroots Economic Development",
  "SSC 3150": "Seminar on Grassroots Economic Development"
};












  

  //
  // ================== CONFIG ==================
  //
  const MIN_CHARS = 1;
  const MAX_RESULTS = 12;
  const HIGHLIGHT_TAG = "strong";

  //
  // ================== INTERNAL STATE ==================
  //
  let courseMap = { ...COURSE_DATA };
  window.__swalCourseMap = courseMap;
  window.__setSwalCourseMap = m => {
    courseMap = { ...m };
    window.__swalCourseMap = courseMap;
  };

  //
  // ================== UTILITIES ==================
  //
  const escapeHtml = txt =>
    String(txt).replace(/[&<>"']/g, ch => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[ch]);

  function findMatches(q) {
    if (!q || q.length < MIN_CHARS) return [];

    const needle = q.toUpperCase();
    const results = [];

    for (const [code, name] of Object.entries(courseMap)) {
      const cu = code.toUpperCase();
      const nu = (name || "").toUpperCase();

      if (cu.includes(needle) || nu.includes(needle)) {
        results.push({ code, name: name || "", cu, nu });
      }
    }

    results.sort((a, b) => {
      const aP = a.cu.startsWith(needle) ? 0 : a.nu.startsWith(needle) ? 1 : 2;
      const bP = b.cu.startsWith(needle) ? 0 : b.nu.startsWith(needle) ? 1 : 2;
      return aP !== bP ? aP - bP : a.cu.localeCompare(b.cu);
    });

    return results.slice(0, MAX_RESULTS);
  }

  //
  // ================== SUGGESTION BOX ==================
  //
  function createSuggestionBox(container) {
    let box = container.querySelector(".swal2-autosuggest-box");
    if (box) return box;

    box = document.createElement("div");
    box.className = "swal2-autosuggest-box";

    Object.assign(box.style, {
      boxSizing: "border-box",
      width: "100%",
      maxHeight: "220px",
      overflowY: "auto",
      background: "#fff",
      border: "1px solid rgba(0,0,0,0.12)",
      borderRadius: "6px",
      marginTop: "6px",
      boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
      fontSize: "14px",
      zIndex: 20000,
      display: "none"
    });

    container.appendChild(box);
    return box;
  }

  function renderSuggestions(box, matches, input) {
    box.innerHTML = "";
    if (!matches.length) {
      box.style.display = "none";
      return;
    }

    matches.forEach((m, idx) => {
      const row = document.createElement("div");
      row.className = "swal2-autosuggest-row";

      Object.assign(row.style, {
        padding: "8px 10px",
        cursor: "pointer",
        borderBottom: "1px solid rgba(0,0,0,0.04)",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      });

      const codeHtml = `<${HIGHLIGHT_TAG}>${escapeHtml(m.code)}</${HIGHLIGHT_TAG}>`;
      row.innerHTML = `${codeHtml} <span style="color:#555; margin-left:8px;">${escapeHtml(m.name)}</span>`;

      row.addEventListener("mousedown", ev => {
        ev.preventDefault();
        input.value = m.code;
        hideBox(box);
      });

      row.addEventListener("mouseenter", () => setFocusedRow(box, idx));

      box.appendChild(row);
    });

    box.style.display = "block";
    box.dataset.focused = "-1";
  }

  function hideBox(box) {
    if (!box) return;
    box.style.display = "none";
    box.dataset.focused = "-1";
  }

  function setFocusedRow(box, index) {
    const rows = box.querySelectorAll(".swal2-autosuggest-row");
    rows.forEach((r, i) => {
      r.style.background = i === index ? "rgba(0,123,255,0.06)" : "";
    });
    box.dataset.focused = String(index);
  }

  function getFocusedRowIndex(box) {
    return Number(box.dataset.focused || -1);
  }

  //
  // ================== ATTACH TO SWAL INPUT ==================
  //
  function attachToInput(input) {
    if (!input || input.dataset.__swalAutosuggestAttached) return;
    input.dataset.__swalAutosuggestAttached = "1";

    let container;
    try {
      container = Swal && Swal.getHtmlContainer ? Swal.getHtmlContainer() : null;
    } catch {
      container = null;
    }
    if (!container) container = input.parentElement || document.body;

    const box = createSuggestionBox(container);
    let lastMatches = [];

    function onInput() {
      const q = input.value.trim();
      if (!q) return hideBox(box);

      lastMatches = findMatches(q);
      renderSuggestions(box, lastMatches, input);
    }

    function onKeyDown(ev) {
      if (box.style.display === "none") return;

      const rows = box.querySelectorAll(".swal2-autosuggest-row");
      if (!rows.length) return;

      const fi = getFocusedRowIndex(box);

      if (ev.key === "ArrowDown") {
        ev.preventDefault();
        const n = fi + 1 >= rows.length ? 0 : fi + 1;
        setFocusedRow(box, n);
      }

      else if (ev.key === "ArrowUp") {
        ev.preventDefault();
        const p = fi - 1 < 0 ? rows.length - 1 : fi - 1;
        setFocusedRow(box, p);
      }

      else if (ev.key === "Enter" && fi >= 0 && lastMatches[fi]) {
        ev.preventDefault();
        input.value = lastMatches[fi].code;
        hideBox(box);
      }

      else if (ev.key === "Escape") {
        hideBox(box);
      }
    }

    input.addEventListener("input", onInput);
    input.addEventListener("keydown", onKeyDown);

    input.addEventListener("blur", () => {
      setTimeout(() => hideBox(box), 120);
    });

    const mo = new MutationObserver(() => {
      const visible =
        (window.Swal && Swal.isVisible && Swal.isVisible()) ||
        document.querySelector(".swal2-container .swal2-popup");

      if (!visible || !document.body.contains(input)) {
        input.removeEventListener("input", onInput);
        input.removeEventListener("keydown", onKeyDown);
        hideBox(box);
        mo.disconnect();
      }
    });

    mo.observe(document.body, { childList: true, subtree: true });
  }

  //
  // ================== SWAL INPUT WATCHER ==================
  //
  function tryAttachExistingSwalInput() {
    try {
      if (window.Swal && Swal.getInput) {
        const input = Swal.getInput();
        if (input && input.tagName === "INPUT") attachToInput(input);
        return;
      }

      const fallback = document.querySelector(".swal2-container .swal2-input");
      if (fallback) attachToInput(fallback);
    } catch {}
  }

  function watchForSwalInputs() {
    setTimeout(tryAttachExistingSwalInput, 50);

    const obs = new MutationObserver(tryAttachExistingSwalInput);
    obs.observe(document.body, { childList: true, subtree: true });

    let tries = 0;
    const interval = setInterval(() => {
      tryAttachExistingSwalInput();
      tries++;
      if (tries > 80) clearInterval(interval);
    }, 100);
  }

  //
  // ================== INIT ==================
  //
  window.__swalAddCourse = (code, name) => {
    courseMap[code] = name;
    window.__swalCourseMap = courseMap;
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", watchForSwalInputs);
  } else {
    watchForSwalInputs();
  }
})();

