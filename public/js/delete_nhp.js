// Adapted from https://github.com/osu-cs340-ecampus/nodejs-starter-app

const deleteNHP = (nurseID, patientID) => {
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", `nhp/?nurseID=${nurseID}&patientID=${patientID}`, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            deleteRow(nurseID, patientID);
        } else {
            console.log("Nurse has Patient relationship could not be deleted.")
        }
    }

    // Send the request and wait for the response
    xhttp.send();
}

const deleteRow = (nurseID, patientID) => {
    // Get table html element
    const table = document.getElementById("nhp-table");

    // Delete row with matching
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value-nid") == nurseID && table.rows[i].getAttribute("data-value-pid") == patientID) {
            table.deleteRow(i);
            break;
        }
    }
}