// Adapted from https://github.com/osu-cs340-ecampus/nodejs-starter-app

const search_input = document.getElementById("search-drug-generic-name");

search_input.addEventListener("keyup", (e) => {

    const search_value = e.target.value.toLowerCase();
    const cells = document.querySelectorAll("#drugs-table .generic-name");
  
    cells.forEach((cell) => {
        if(cell.textContent.toLowerCase().includes(search_value)){
            cell.closest("tr").style.display = "table-row";
        } else{
            cell.closest("tr").style.display = "none";
        }
    })
  
});