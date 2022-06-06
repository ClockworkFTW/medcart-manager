// Adapted from https://github.com/osu-cs340-ecampus/nodejs-starter-app

const deleteDrug = (drugID) => {
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", `drugs/${drugID}`, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            deleteRow(drugID);
        } else {
            console.log("Drug could not be deleted.")
        }
    }

    // Send the request and wait for the response
    xhttp.send();
}

const deleteRow = (drugID) => {
    // Get table html element
    const table = document.getElementById("drugs-table");

    // Delete row with matching drugID
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == drugID) {
            table.deleteRow(i);
            break;
        }
    }
}