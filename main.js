

const printToDom = (divId, string) => {
    document.getElementById(divId).innerHTML = string;
}

const domString = (animalsArray) => {
    let domString = '';
    for (let i=0; i<animalsArray.length; i++){
        let animal = animalsArray[i];
        domString += `<div class="animal">`;
        domString +=    `<h1>${animal.name}</h1>`;
        domString +=    `<h3>${animal.number}</h3>`;
        domString +=    `<img class="animalImage" src=${animal.imageUrl}>`;
        domString +=    `<div class="button-container">`
        domString +=        `<button class="escaped-btn">Escaped</button>`;
        domString +=    `</div>`
        domString += `</div>`;
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