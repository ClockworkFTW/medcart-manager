// Adapted from https://github.com/osu-cs340-ecampus/nodejs-starter-app

const search_input = document.getElementById("search-patient-name");

search_input.addEventListener("keyup", (e) => {

    const search_value = e.target.value.toLowerCase();
    const fnCells = document.querySelectorAll("#patients-table .first-name");
    const lnCells = document.querySelectorAll("#patients-table .last-name");
    const cells = [...fnCells].map((fnCell, i) => [fnCell, lnCells[i]])
  
    cells.forEach((cell) => {
        if(cell[0].textContent.toLowerCase().includes(search_value) || cell[1].textContent.toLowerCase().includes(search_value) ){
            cell[0].closest("tr").style.display = "table-row";
        } else{
            cell[0].closest("tr").style.display = "none";
        }
    })

});