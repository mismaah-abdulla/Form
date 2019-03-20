const NAME_MAX = 30;
const NAME_MIN = 5;
const VALID_EMAIL = /\S+@\S+\.\S+/;
var rowCounter = 1
function submitForm() {
    var name = document.getElementById("name");
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var date = document.getElementById("birthDate").value;
    
    if (checkEmpty(name.value) || checkEmpty(email.value) || checkEmpty(password.value) || checkEmpty(date)) {
        document.getElementById("error").innerHTML = "Please fill all fields.";
        return;
    }
    
    if (!isValidName(name.value)) {
        document.getElementById("error").innerHTML = `Name should be between ${NAME_MAX} and ${NAME_MIN} characters.`;
        return;
    }

    if (!isValidEmail(email)) {
        document.getElementById("error").innerHTML = `Must be a valid email.`
        return;
    }
    
    var inputDate = new Date(date);
    var userAge = getAge(inputDate);
    document.getElementById("tableRows").innerHTML += getRow(name.value, email.value, password.value, userAge, rowCounter);
    rowCounter++
    
    document.getElementById("error").innerHTML = "";
    clearField(name);
    clearField(email);
    clearField(password);
}
function getAge(birthDate) {
    var currentDate = new Date();
    var age = currentDate.getFullYear() - birthDate.getFullYear();
    return age;

}
function getRow(name, email, password, age, rowCounter){
    var encodedPassword = encodePassword(password);
    return `<tr id="row${rowCounter}">
            <td class="nameCell">${name}</td>
            <td class="emailCell">${email}</td>
            <td class="passwordCell">
                <span id="encodedPassword${rowCounter}">${encodedPassword}</span>
                <button style="float: right;" id="decodePass" onmousedown="decodeEncodedPassword('${encodedPassword}', ${rowCounter})" onmouseup="hideDecodedPassword('${password}', ${rowCounter})">Decode</button>
            </td>
            <td>${age}</td>
            <td class=buttonCell>${generateRowButtons(rowCounter)}</td>
            </tr>`;
}

function checkEmpty(field){
    return field === "";
}

function clearField(field){
    field.value = "";
}

function isValidName(name){
    return name.length < NAME_MAX && name.length > NAME_MIN;
}

function isValidEmail(email){
    return VALID_EMAIL.test(String(email.value).toLowerCase());
}

function showPassword(){
    document.getElementById("password").type = "text";
}

function hidePassword(){
    document.getElementById("password").type = "password";
}

function encodePassword(password){
    var encodedPassword = window.btoa(password);
    return encodedPassword;
}

function decodePassword(password){
    var decodedPassword = window.atob(password);
    return decodedPassword;
}

function decodeEncodedPassword(password, counter){
    document.getElementById(`encodedPassword${counter}`).innerHTML = decodePassword(password);
}

function hideDecodedPassword(password, counter){
    document.getElementById(`encodedPassword${counter}`).innerHTML = encodePassword(password);
}

function deleteRow(rowNumber){
    var rowToBeDeleted = document.getElementById(`row${rowNumber}`);
    rowToBeDeleted.parentNode.removeChild(rowToBeDeleted);
}

function editRow(rowNumber){
    returnRowContent(rowNumber);
    changeFormButtonsForEditing(rowNumber);
    disableRowButtons();
}

function returnRowContent(rowNumber){
    document.getElementById("name").value = document.querySelector(`#row${rowNumber} .nameCell`).innerHTML;
    document.getElementById("email").value = document.querySelector(`#row${rowNumber} .emailCell`).innerHTML;
    var password = document.getElementById(`encodedPassword${rowNumber}`).innerHTML;
    var decodedPassword = decodePassword(password);
    document.getElementById("password").value = decodedPassword;
}

function changeFormButtonsForEditing(rowNumber){
    document.getElementById("actionButtons").innerHTML = `<button onclick="updateForm(${rowNumber})">Update</button><button onclick="cancelUpdateForm(${rowNumber})">Cancel</button>`
}

function disableRowButtons(){
    var allButtons = document.querySelectorAll(`.buttonCell`);
    for (var i = 0; i < allButtons.length; i++){
        allButtons[i].innerHTML = "";
    }
}

function enableRowButtons(){
    var allRows = document.getElementById("tableRows");
    var rows = allRows.childNodes;
    for (var x = 1; x < rows.length; x++){
        var rowId = rows[x].id.substring(3);
    
        var buttonCells = document.querySelector(`#row${rowId} .buttonCell`);
        buttonCells.innerHTML = generateRowButtons(rowId);
        
    }
}

function generateRowButtons(rowNumber){
    return `<button style="float:left;" onclick="deleteRow(${rowNumber})">Delete row</button> <button style="float:right;" onclick="editRow(${rowNumber})">Edit row</button>`
}


function updateForm(rowNumber){
    var name = document.getElementById("name");
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var date = document.getElementById("birthDate").value;

    if (checkEmpty(name.value) || checkEmpty(email.value) || checkEmpty(password.value) || checkEmpty(date)) {
        document.getElementById("error").innerHTML = "Please fill all fields.";
        return;
    }

    if (!isValidName(name.value)) {
        document.getElementById("error").innerHTML = `Name should be between ${NAME_MAX} and ${NAME_MIN} characters.`;
        return;
    }

    if (!isValidEmail(email)) {
        document.getElementById("error").innerHTML = `Must be a valid email.`
        return;
    }

    var inputDate = new Date(date);
    var userAge = getAge(inputDate);

    document.getElementById(`row${rowNumber}`).innerHTML = getRow(name.value, email.value, password.value, userAge, rowNumber);

    cancelUpdateForm(rowNumber);

}

function cancelUpdateForm(rowNumber){
    clearField(document.getElementById("name"));
    clearField(document.getElementById("email"));
    clearField(document.getElementById("password"));
    document.getElementById("actionButtons").innerHTML = `<button onclick="submitForm()">Submit</button>`
    document.getElementById("error").innerHTML = "";
    enableRowButtons();
}