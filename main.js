

const printToDom = (divId, string) => {
    document.getElementById(divId).innerHTML = string;
}

const domString = (animalsArray) => {
    let domString = '';
    for (let i=0; i<animalsArray.length; i++){
        let animal = animalsArray[i];
        if(animal.isCarnivore === true){
            domString += `<div class="animal carnivore">`;
        }else {
            domString += `<div class="animal vegetable">`;
        }
        domString +=    `<h1>${animal.name}</h1>`;
        domString +=    `<h3>${animal.number}</h3>`;
        domString +=    `<img class="animalImage" src=${animal.imageUrl}>`;
        domString +=    `<div class="button-container">`
        domString +=        `<button class="escaped">Escaped</button>`;
        domString +=    `</div>`
        domString += `</div>`;
    };
    printToDom("animal-holder", domString);
}

const addEscapedEventListeners = () => {
    const escapedButtons = document.getElementsByClassName("escaped");
    for (let i=0; i<escapedButtons.length; i++){
        escapedButtons[i].addEventListener('click', animalEscaped)
    }
    // animalsEscaped();
};

const animalEscaped = (e) => {
    const badAnimalButton = e.target.parentNode;
    showCarnivores();
    showVegetables();
    showFoundButton(badAnimalButton);
};

const showFoundButton = (buttonContainer) => {
    buttonContainer.innerHTML = `<button id="found">Found</button>`;
    initializeFoundButton();
};

const initializeFoundButton = () => {
    const foundButton = document.getElementById('found');
    foundButton.addEventListener('click', () => {
        const animals = document.getElementsByClassName('animal');
        for (let m=0; m<animals.length; m++){
            animals[m].children[3].innerHTML = `<button class="escaped">Escaped</button>`;
            animals[m].classList.remove('green');
            animals[m].classList.remove('red');
        }
        addEscapedEventListeners();
    });
};

const showCarnivores = () => {
    const carnivores = document.getElementsByClassName("carnivore");
    for (let j=0; j<carnivores.length; j++){
        carnivores[j].children[3].innerHTML = "";
        carnivores[j].classList.add('red');
    }
};

const showVegetables = () => {
    const vegetables = document.getElementsByClassName('vegetable');
    for (let k=0; k<vegetables.length; k++){
        vegetables[k].children[3].innerHTML = `<button class="eatMe">EAT ME!</button>`;
        vegetables[k].classList.add('green');
    }
};




function executeThisCodeisXHRFails(){
    console.log("something went wrong");
}

function executeThisCodeAfterFileLoaded(){
    const data = JSON.parse(this.responseText);
    domString(data.animals);
    addEscapedEventListeners();
}

const startApplication = () => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener("load", executeThisCodeAfterFileLoaded);
    myRequest.addEventListener("error", executeThisCodeisXHRFails);
    myRequest.open("GET", "animals.json");
    myRequest.send();
}

startApplication();