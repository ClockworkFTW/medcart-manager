// Adapted from https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let updateNurseForm = document.getElementById('update-nurse-form-ajax');

// Modify the objects we need
updateNurseForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    

    // Get form fields we need to get data from
    let inputFullName = document.getElementById("select-fname");
    let inputFName = document.getElementById("input-fname");
    let inputLName = document.getElementById("input-lname");
    let inputLicNum = document.getElementById("input-licnum");
    let inputLicExp = document.getElementById("input-licexp");


    // Get the values from the form fields
    let fullNameValue = inputFullName.value;
    let fnameValue = inputFName.value;
    let lnameValue = inputLName.value;
    let licnumValue = inputLicNum.value;
    let licexpValue = inputLicExp.value;
    
    
    console.log(fnameValue)

    // Put our data we want to send in a javascript object
    let data = {
        fullname: fullNameValue,
        fname: fnameValue,
        lname: lnameValue,
        licnum: licnumValue,
        licexp: licexpValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "unurses", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, fullNameValue);

        }
        else {
            console.log("Nurse could not be updated.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

});


function updateRow(data, nurseID) {
    const parsedData = JSON.parse(data);
    const table = document.getElementById("nurses-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == nurseID) {

            // Get the location of the row where we found the matching person ID
            const updateRowIndex = table.getElementsByTagName("tr")[i];

            updateRowIndex.getElementsByTagName("td")[0].innerHTML = parsedData[1];
            updateRowIndex.getElementsByTagName("td")[1].innerHTML = parsedData[2];
            updateRowIndex.getElementsByTagName("td")[2].innerHTML = parsedData[3];
            updateRowIndex.getElementsByTagName("td")[3].innerHTML = parsedData[4];
       }
    }
};