// Adapted from https://github.com/osu-cs340-ecampus/nodejs-starter-app

const deleteNurse = (nurseID) => {
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", `nurses/${nurseID}`, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            deleteRow(nurseID);
        } else {
            console.log("Nurse could not be deleted.")
        }
    }

    // Send the request and wait for the response
    xhttp.send();
}

const deleteRow = (nurseID) => {
    // Get table html element
    const table = document.getElementById("nurses-table");
    
    // Delete row with matching nurseID
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == nurseID) {
            table.deleteRow(i);
            break;
        }
    }
}