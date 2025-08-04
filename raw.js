

// This script enhances the admin.html page with a search bar and JSON export functionality
document.addEventListener("DOMContentLoaded", function() {
  const table = document.querySelector("table");
  if (!table) return;

  const rows = Array.from(table.rows);

  // 1) Precompute for rows ≥ 3:
  //    - data-original (what was in col 0 originally)
  //    - data-day (the day heading, inherited from the nearest non-empty above)
  let lastDay = "";
  for (let r = 3; r < rows.length; r++) {
    const cell0 = rows[r].cells[0];
    const orig = cell0.innerText.trim();
    cell0.dataset.original = orig;            // store original (often blank)
    if (orig !== "") {
      lastDay = orig;                          // update lastDay
    }
    cell0.dataset.day = lastDay;               // record inherited day
  }

  // 2) Build a sticky search bar and insert above the table
  const container = document.createElement("div");
  container.id = "searchContainer";
  container.style.cssText = "position:sticky; top:0; background:#fff; padding:10px; z-index:100;";

  const input = document.createElement("input");
  input.type = "text";
  input.id = "searchInput";
  input.placeholder = "Search course (e.g. BUS 1201)";
  input.style.marginRight = "8px";

  const searchBtn = document.createElement("button");
  searchBtn.textContent = "Search";
  searchBtn.style.marginRight = "8px";
  searchBtn.id = "searchBtn";

  searchBtn.addEventListener("click", searchCourse);

  const resetBtn = document.createElement("button");
  resetBtn.textContent = "Reset";
  resetBtn.id = "resetBtn";
  resetBtn.addEventListener("click", resetTable);

  container.appendChild(input);
  container.appendChild(searchBtn);
  container.appendChild(resetBtn);
  table.parentNode.insertBefore(container, table);

  // --- filtering functions ---

  function searchCourse() {
    const query = document.getElementById("searchInput")
                        .value.trim()
                        .toLowerCase();
    if (!query) return;

    const matchedCols = new Set();
    const matchedRows = new Set();

    // 1) Identify which columns (c > 0) contain the query anywhere
    for (let r = 0; r < rows.length; r++) {
      const cells = rows[r].cells;
      for (let c = 1; c < cells.length; c++) {
        if (cells[c].innerText.toLowerCase().includes(query)) {
          matchedCols.add(c);
        }
      }
    }

    // 2) Identify which rows (r ≥ 3) have at least one match in those columns
    for (let r = 3; r < rows.length; r++) {
      const cells = rows[r].cells;
      for (let c of matchedCols) {
        if (cells[c].innerText.toLowerCase().includes(query)) {
          matchedRows.add(r);
          break;
        }
      }
    }

    // 3) Hide every row not in {0,1,2} ∪ matchedRows
    for (let r = 0; r < rows.length; r++) {
      rows[r].style.display = (r < 3 || matchedRows.has(r)) ? "" : "none";
    }

    // 4) Hide every column not in {0} ∪ matchedCols
    for (let r = 0; r < rows.length; r++) {
      const cells = rows[r].cells;
      for (let c = 0; c < cells.length; c++) {
        cells[c].style.display = (c === 0 || matchedCols.has(c)) ? "" : "none";
      }
    }

    // 5) For each visible “content” row (r ≥ 3), set col 0 to data-day
    //    and blank out any cell in a matched column that does NOT contain the query.
    for (let r of matchedRows) {
      const cells = rows[r].cells;

      // Replace column 0 text with its stored day label
      cells[0].innerText = rows[r].cells[0].dataset.day;

      // In each matched column: hide non‐matching cell text
      for (let c of matchedCols) {
        if (cells[c].innerText.toLowerCase().includes(query)) {
          cells[c].style.visibility = "visible";
        } else {
          cells[c].style.visibility = "hidden";
        }
      }
      // Keep col 0 visible (we just rewrote it)
      cells[0].style.visibility = "visible";
    }

    // 6) Ensure header rows (0,1,2) stay fully visible
    for (let r = 0; r < 3; r++) {
      const cells = rows[r].cells;
      for (let c = 0; c < cells.length; c++) {
        cells[c].style.visibility = "visible";
      }
    }
  }

  function resetTable() {
    // Restore all rows & cells to their original state
    for (let r = 0; r < rows.length; r++) {
      rows[r].style.display = "";
      const cells = rows[r].cells;
      for (let c = 0; c < cells.length; c++) {
        cells[c].style.display = "";
        cells[c].style.visibility = "visible";

        // Restore column 0 to its original content for rows ≥ 3
        if (r >= 3 && c === 0) {
          cells[0].innerText = cells[0].dataset.original;
        }
      }
    }
    document.getElementById("searchInput").value = "";
  }
});


















document.addEventListener("DOMContentLoaded", function () {
  const table = document.querySelector("table");

  // Create container for JSON output and download button
  const outputDiv = document.createElement("div");
  outputDiv.style.marginTop = "20px";
  outputDiv.id = "jsonOutput";
  table.parentNode.appendChild(outputDiv);

  // Update existing searchCourse function
  const originalSearch = document.querySelector("button").onclick;
  document.querySelector("button").onclick = function () {
    searchCourse();
  };

  function searchCourse() {
    const query = document.getElementById("searchInput").value.trim().toLowerCase();
    if (!query) return;

    const rows = table.rows;
    const matchedCols = new Set();
    const matchedRows = new Set();

    for (let r = 0; r < rows.length; r++) {
      const cells = rows[r].cells;
      for (let c = 1; c < cells.length; c++) {
        if (cells[c].innerText.toLowerCase().includes(query)) {
          matchedCols.add(c);
        }
      }
    }

    for (let r = 3; r < rows.length; r++) {
      const cells = rows[r].cells;
      for (let c of matchedCols) {
        if (cells[c].innerText.toLowerCase().includes(query)) {
          matchedRows.add(r);
          break;
        }
      }
    }

    for (let r = 0; r < rows.length; r++) {
      rows[r].style.display = (r < 3 || matchedRows.has(r)) ? "" : "none";
    }

    for (let r = 0; r < rows.length; r++) {
      const cells = rows[r].cells;
      for (let c = 0; c < cells.length; c++) {
        cells[c].style.display = (c === 0 || matchedCols.has(c)) ? "" : "none";
      }
    }

    for (let r of matchedRows) {
      const cells = rows[r].cells;
      cells[0].innerText = cells[0].dataset.day;
      for (let c of matchedCols) {
        if (cells[c].innerText.toLowerCase().includes(query)) {
          cells[c].style.visibility = "visible";
        } else {
          cells[c].style.visibility = "hidden";
        }
      }
      cells[0].style.visibility = "visible";
    }

    for (let r = 0; r < 3; r++) {
      const cells = rows[r].cells;
      for (let c = 0; c < cells.length; c++) {
        cells[c].style.visibility = "visible";
      }
    }

    generateJSON(query);
  }

  function generateJSON(query) {
    const rows = table.rows;
    const headers = Array.from(rows[2].cells).map(cell => cell.innerText.trim());
    const result = {};

    let courseID = "";
    const data = [];

    for (let r = 3; r < rows.length; r++) {
      if (rows[r].style.display === "none") continue;
      const day = rows[r].cells[0].innerText.trim();

      for (let c = 1; c < rows[r].cells.length; c++) {
        const cell = rows[r].cells[c];
        if (cell.style.display !== "none" && cell.innerText.toLowerCase().includes(query)) {
          const val = cell.innerText.trim();
          // Only set courseID once, from the first match
          if (!courseID) {
            const match = val.match(/([A-Z]{3,4}\s*\d{4})/i);
            if (match) {
              courseID = match[1];
            }
          }
          const details = val.split("-").map(s => s.trim());
          const time = headers[c];
          data.push([details[1] || "", details[2] || "", details[3] || "", day, time]);
        }
      }
    }

    if (!courseID || data.length === 0) {
      outputDiv.innerHTML = `<p style="color:red;">No valid data found to generate JSON.</p>`;
      return;
    }


    // Only use the course code as the key and for the filename

    // Force the key to be only the course code, lowercase (e.g., 'cse 2102')
    const codeOnlyMatch = (courseID || "").match(/^[A-Z]{3,4}\s*\d{4}/i);
    const codeOnly = codeOnlyMatch ? codeOnlyMatch[0].replace(/\s+/g, ' ').trim().toLowerCase() : (courseID || '').toLowerCase();
    result[codeOnly] = data;

    const jsonStr = JSON.stringify(result, null, 2);
/*
    outputDiv.innerHTML = `
      <h3>Generated JSON</h3>
      <pre style="background:#f0f0f0; padding:10px;">${jsonStr}</pre>
      <button id="downloadBtn">Download JSON</button>
    `;


    document.getElementById("downloadBtn").onclick = () => {
      const blob = new Blob([jsonStr], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = codeOnly+".json";
      a.click();
    };

*/

  }
});
