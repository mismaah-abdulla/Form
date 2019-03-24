
var users = [];
function submitForm() {
    var name = document.getElementById("name");
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var date = document.getElementById("birthDate").value;

    var validation = new UserValidator (name.value, email.value, password.value, date);
    var errorMessage = validation.validate();
    if (errorMessage){
        document.getElementById("error").innerHTML = errorMessage;
        return;
    }

    var inputDate = new Date(date);
    var user = new User (name.value, email.value, password.value, inputDate);
    users.push(user);
    
    document.getElementById("tableRows").innerHTML += getRow(user);
    document.getElementById("error").innerHTML = "";
    clearField(name);
    clearField(email);
    clearField(password);
}

function getRow(user){
    return `<tr id="row${user.id}">
            <td class="nameCell">${user.name}</td>
            <td class="emailCell">${user.email}</td>
            <td class="passwordCell">
                <span id="encodedPassword${user.id}">${user.encodedPassword}</span>
                <button style="float: right;" id="decodePass" onmousedown="decodePassword(${user.id})" onmouseup="encodePassword(${user.id})">Decode</button>
            </td>
            <td>${user.age}</td>
            <td class=buttonCell>${generateRowButtons(user.id)}</td>
            </tr>`;
}

function encodePassword(userId){
    var user = users.find(x => x.id === userId);
    document.getElementById(`encodedPassword${userId}`).innerHTML = user.encodedPassword;
}

function decodePassword(userId){
    var user = users.find(x => x.id === userId);
    document.getElementById(`encodedPassword${userId}`).innerHTML = user.password;
}

function clearField(field){
    field.value = "";
}

function showPassword(){
    document.getElementById("password").type = "text";
}

function hidePassword(){
    document.getElementById("password").type = "password";
}

function deleteRow(rowNumber){
    var rowToBeDeleted = document.getElementById(`row${rowNumber}`);
    rowToBeDeleted.parentNode.removeChild(rowToBeDeleted);
    var user = users.findIndex(x => x.id === rowNumber);
    users.splice(user, 1);
}

function editRow(rowNumber){
    returnRowContent(rowNumber);
    changeFormButtonsForEditing(rowNumber);
    disableRowButtons();
}

function returnRowContent(rowNumber){
    var user = users.find(x => x.id === rowNumber);
    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;
    document.getElementById("password").value = user.password;
}

function changeFormButtonsForEditing(rowNumber){
    document.getElementById("actionButtons").innerHTML = `<button onclick="updateForm(${rowNumber})">Update</button><button onclick="cancelUpdateForm(${rowNumber})">Cancel</button>`;
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

    var validation = new UserValidator (name.value, email.value, password.value, date);
    if (validation.validate()){
        return document.getElementById("error").innerHTML = validation.validate();
    }

    var inputDate = new Date(date);

    var user = users.find(x => x.id === rowNumber);
    user.name = name.value;
    user.email = email.value;
    user.password = password.value;
    user.birthDate = inputDate;
    document.getElementById(`row${rowNumber}`).innerHTML = getRow(user);

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