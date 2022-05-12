// Get the objects we need to modify
const updateNurseForm = document.getElementById('update-nurse-form-ajax');

// Modify the objects we need
updateNurseForm.addEventListener("submit", (e) => {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFullName = document.getElementById("mySelect");
    let inputLicNum = document.getElementById("input-licnum");
    let inputLicExp = document.getElementById("input-exp");

    // Get the values from the form fields
    let fullNameValue = inputFullName.value;
    let licnumValue = inputLicNum.value;
    let licexpValue = inputLicExp.value;
    

    // Put our data we want to send in a javascript object
    let data = {
        fullname: fullNameValue,
        licnum: licnumValue,
        licexp: licexpValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            updateRow(xhttp.response, fullNameValue);
        } else {
            console.log("Nurse could not be updated.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


const updateRow = (data, personID) => {
    const parsedData = JSON.parse(data);
    const table = document.getElementById("nurses-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == nurseID) {

            // Get the location of the row where we found the matching person ID
            const updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            const td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign homeworld to our value we updated to
            td.innerHTML = parsedData[0].name; 
       }
    }
}