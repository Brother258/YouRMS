
document.addEventListener("DOMContentLoaded", function() {
  const table = document.querySelector("table");
  if (!table) return;

  const rows = Array.from(table.rows);


  let lastDay = "";
  for (let r = 3; r < rows.length; r++) {
    const cell0 = rows[r].cells[0];
    const orig = cell0.innerText.trim();
    cell0.dataset.original = orig;           
    if (orig !== "") {
      lastDay = orig;                         
    }
    cell0.dataset.day = lastDay;             
  }

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



  function searchCourse() {
    const query = document.getElementById("searchInput")
                        .value.trim()
                        .toLowerCase();
    if (!query) return;

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

      cells[0].innerText = rows[r].cells[0].dataset.day;

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
  }

  function resetTable() {

    for (let r = 0; r < rows.length; r++) {
      rows[r].style.display = "";
      const cells = rows[r].cells;
      for (let c = 0; c < cells.length; c++) {
        cells[c].style.display = "";
        cells[c].style.visibility = "visible";

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


  const outputDiv = document.createElement("div");
  outputDiv.style.marginTop = "20px";
  outputDiv.id = "jsonOutput";
  table.parentNode.appendChild(outputDiv);

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




    // Force the key to be only the course code, lowercase 
    const codeOnlyMatch = (courseID || "").match(/^[A-Z]{3,4}\s*\d{4}/i);
    const codeOnly = codeOnlyMatch ? codeOnlyMatch[0].replace(/\s+/g, ' ').trim().toLowerCase() : (courseID || '').toLowerCase();
    result[codeOnly] = data;

    const jsonStr = JSON.stringify(result, null, 2);

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
  }
});

