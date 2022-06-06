// Adapted from https://github.com/osu-cs340-ecampus/nodejs-starter-app

const deletePrescription = (prescriptionID) => {
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", `prescriptions/${prescriptionID}`, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            deleteRow(prescriptionID);
        } else {
            console.log("Prescription could not be deleted.")
        }
    }

    // Send the request and wait for the response
    xhttp.send();
}

const deleteRow = (prescriptionID) => {
    // Get table html element
    const table = document.getElementById("prescriptions-table");

    // Delete row with matching prescriptionID
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == prescriptionID) {
            table.deleteRow(i);
            break;
        }
    }
}