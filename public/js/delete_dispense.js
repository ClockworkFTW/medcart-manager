// Adapted from https://github.com/osu-cs340-ecampus/nodejs-starter-app

const deleteDispense = (dispenseID) => {
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", `dispenses/${dispenseID}`, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            deleteRow(dispenseID);
        } else {
            console.log("Dispense event could not be deleted.")
        }
    }

    // Send the request and wait for the response
    xhttp.send();
}

const deleteRow = (dispenseID) => {
    // Get table html element
    const table = document.getElementById("dispenses-table");

    // Delete row with matching dispenseID
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == dispenseID) {
            table.deleteRow(i);
            break;
        }
    }
}