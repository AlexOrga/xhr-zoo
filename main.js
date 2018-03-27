

const printToDom = (divId, string) => {
    document.getElementById(divId).innerHTML = string;
}

const domString = (animalsArray) => {
    let domString = '';
    for (let i=0; i<animalsArray.length; i++){
        domString += `<h1>${animalsArray[i].name}</h1>`;
    };
    printToDom("animal-holder", domString);
}

function executeThisCodeisXHRFails(){
    console.log("something went wrong");
}

function executeThisCodeAfterFileLoaded(){
    const data = JSON.parse(this.responseText);
    domString(data.animals);
}

const startApplication = () => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener("load", executeThisCodeAfterFileLoaded);
    myRequest.addEventListener("error", executeThisCodeisXHRFails);
    myRequest.open("GET", "animals.json");
    myRequest.send();
}

startApplication();