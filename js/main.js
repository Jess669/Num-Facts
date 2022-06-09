// MODEL

let factText;
let mainFactBody = document.querySelector('#main-fact-body');

function getInputValue(e) {

    let inputValue = e.target.value;
    if (inputValue)
    (inputValue != '') ? setInputValueFetch(inputValue) : clearFactBody();

}

//FETCH DATA USING AJAX
// function setInputValueAjax(inputValue) {

//     let xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//         factText = this.responseText;
//         render(factText);
//     }
//     };
//     xhttp.open("GET", "http://numbersapi.com/" + inputValue, true);
//     xhttp.send();

// }


// FETCH DATA USING FETCH
function setInputValueFetch(inputValue) {

    fetch('http://numbersapi.com/'+ inputValue)
    .then(response => response.text())
    .then(data => render(data))
    .catch(error => console.log('Error: ', error));

}

function clearFactBody() {
    mainFactBody.innerHTML = '';
}

function deleteInputValue(e) {
    let inputFieldValue = inputField.value;
    if (e.keyCode == 8) {
        inputField.disabled = true;
        e.preventDefault();
        if (inputFieldValue != '') {
            let newInputValue = inputFieldValue.slice(0, -1);
            setTimeout(function(){ 
                newInputValues(newInputValue);
                if (newInputValue.length >= 1) {
                    setInputValueFetch(newInputValue);
                    inputField.disabled = false;
                    inputField.focus();
                }else {
                    clearFactBody();
                    inputField.disabled = false;
                    inputField.focus();
                }   
             }, 400);
        }else {
            inputField.disabled = false;
            inputField.focus();
        }
    }
}

function newInputValues(newInputValue) {
    inputField.value = newInputValue;
}




// CONTROLLER
let inputField = document.querySelector('#main-fact-input');

inputField.addEventListener('input',getInputValue);
inputField.addEventListener('keydown',deleteInputValue);
inputField.focus();

render();








// VIEW

function render(results = '') {
    factText = results;
    mainFactBody.innerHTML = '';
    if (factText != undefined && factText != '') {
        let title = document.createElement("h2");
        let text = document.createElement("p");

        title.innerText = 'Number Fact';
        text.style.cssText = 'word-wrap: break-word; padding-top: 10px';
        text.innerText = factText;

        mainFactBody.appendChild(title);
        mainFactBody.appendChild(text);
    }
}