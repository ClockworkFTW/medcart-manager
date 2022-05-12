const deletePatient = (patientID) => {
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", `patients/${patientID}`, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            deleteRow(patientID);
        } else {
            console.log("Patient could not be deleted.")
        }
    }

    // Send the request and wait for the response
    xhttp.send();
}

const deleteRow = (patientID) => {
    // Get table html element
    const table = document.getElementById("patients-table");

    // Delete row with matching patientID
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == patientID) {
            table.deleteRow(i);
            break;
        }
    }
}