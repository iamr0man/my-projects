// Get DOM Elements
const modal = document.querySelector('#visit-modal');
const modalBtn = document.querySelector('#modal-btn');
const closeBtn = document.querySelector('.close');
const createBtn = document.querySelector('.modal-footer button');
const mainBlock = document.querySelector('.main-block');
const clearAllBtn = document.querySelector('.clearAll')
let btnShowMore;
let idCard = 0;
let index = 0;
const listOfDoctor = document.getElementById('list-of-doctors');
const listOfInputs = document.getElementById('form-inputs');


document.addEventListener('DOMContentLoaded', getCards);

function getCards() {
    let cards;
    let positions;

    if (localStorage.getItem('positions') === null) {
        positions = [];
    } else {
        positions = JSON.parse(localStorage.getItem('positions'))
    }

    if (localStorage.getItem('cards') === null) {
        cards = [];
    } else {
        cards = JSON.parse(localStorage.getItem('cards'))
    }

    cards.forEach(function (item) {
        const createdElem = document.createElement("ul");
        
    
        if (item != undefined) {
            if(positions[idCard] != undefined){
                createdElem.style.top = (`${positions[idCard][0]}` )
            }else{
                createdElem.style.top = 0; 
            }
            if(positions[idCard] !== undefined){
                createdElem.style.left = (`${positions[idCard][1]}` )
            }else{
                createdElem.style.left = 0;
            }
            createdElem.setAttribute("id", `${idCard++}`);
            createdElem.classList.add("created-elements");
            mainBlock.appendChild(createdElem);
            for (let [key, value] of Object.entries(item.slice(0, -2))) {
                const li = document.createElement('li');
                li.innerHTML = `${value}`
                createdElem.appendChild(li);
            }
            
            let child = createdElem.children;
            child[2].style.display = 'block'; // show full name
            child[child.length - 1].style.display = 'block'; // show full name

            const btn = addBtnShowMore();
            createdElem.appendChild(btn);

            const delBtn = deleteVisit();
            createdElem.appendChild(delBtn);

            createdElem.style.display = "flex";
        }
    })
    if (mainBlock.children.length >= 3) {
        document.querySelector(".main-block span").style.display = "none";
    }
    findCard();
}

// Events
modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);
createBtn.addEventListener('click', checkInput);
clearAllBtn.addEventListener('click',clearAll);

// Open
function openModal() {
    modal.style.display = 'block';
}

// Close
function closeModal() {
    modal.style.display = 'none';
}

// Close If Outside Click
function outsideClick(e) {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
}


class Visit {
    constructor(target, date, fullName) {
        this.target = target;
        this.date = date;
        this.fullName = fullName;
    }

    addCard() {
        const createdElem = document.createElement("ul");
        createdElem.setAttribute("id", `${idCard++}`);

        createdElem.classList.add("created-elements");
        mainBlock.appendChild(createdElem);
        ;
        for (let [key, value] of Object.entries(this)) {
            const li = document.createElement('li');
            li.innerHTML = `${key}: ${value}`
            createdElem.appendChild(li);
        }
        let child = createdElem.children;
        child[2].style.display = 'block'; // show full name
        
        child[child.length - 1].style.display = 'block'; // show full name

        const btn = addBtnShowMore();
        createdElem.appendChild(btn);

        const delBtn = deleteVisit();
        createdElem.appendChild(delBtn);
        createdElem.style.display = "flex";

        storeCardInLocalStorage(createdElem.children);
    }
}

class VisitToCardiologist extends Visit {
    constructor(target, date, fullName, pressure, iWeight, diseases, age) {
        super(target, date, fullName);
        this.pressure = pressure;
        this.iWeight = iWeight;
        this.diseases = diseases;
        this.age = age;
        this.position = "Cardiologist"
        this.id = 0;
    }
}

class VisitToDentist extends Visit {
    constructor(target, date, fullName, dateLastVist) {
        super(target, date, fullName);
        this.dateLastVist = dateLastVist;
        this.position = "Dentist"
        this.id = 1;
    }
}

class VisitToTherapist extends Visit {
    constructor(target, date, fullName, age) {
        super(target, date, fullName);
        this.age = age;
        this.position = "Therapist"
        this.id = 2;
    }
}

function storeCardInLocalStorage(card) {
    let cards;
    if (localStorage.getItem('cards') === null) {
        cards = [];
    } else {
        cards = JSON.parse(localStorage.getItem('cards'))
    }

    const temp = [];
    for (let i = 0; i < card.length; i++) {
        temp.push(card[i].textContent);
    }

    cards.push(temp);
    localStorage.setItem('cards', JSON.stringify(cards))
}


function checkInput() {
    let valueOfInput =listOfInputs.children[index];
    if(mainBlock.children.length<11){
        for (let k = 0; k < valueOfInput.children.length; k++) {
            if (valueOfInput.children[k].value != "" && valueOfInput.children[k].value != undefined) {
                if(k==valueOfInput.children.length-2){
                    return createVisit();
                }    
            } else {
                valueOfInput.children[k].classList.add("eror-msg");
            }
        }
    }else {
        createBtn.disabled = "true";
    }
}

function createVisit() {
    const arr = [];
    let item = '';
    for (let i = 0; i < listOfInputs.children.length; i++) {
        if (listOfInputs.children[i].style.display == "block") {
            for (let k = 0; k < listOfInputs.children[i].children.length; k++) {
                arr.push(listOfInputs.children[i].children[k].value)
            }

            if (index === 0) {
                item = new VisitToCardiologist(...arr);
            } else if (index === 1) {
                item = new VisitToDentist(...arr);
            } else {
                item = new VisitToTherapist(...arr);
            }
            Object.defineProperty(item, 'id', {
                enumerable: false
            });

            item.addCard();
            closeModal();
            document.querySelector(".main-block span").style.display = "none";
            clearInputs();
        }
    }
}

function clearInputs() {
    for (let i = 0; i < listOfInputs.children[index].children.length; i++) {
        
        listOfInputs.children[index].children[i].value = '';
        listOfInputs.children[index].children[i].classList.remove("eror-msg");
    }
}

listOfDoctor.addEventListener('change', showEntry);

function showEntry(e) {
    listOfInputs.children[index].style.display = 'none';

    const nodes = Array.from(listOfDoctor.children);
    const doc = nodes.filter(i => i.value === e.target.value)

    index = nodes.indexOf(doc[0]) - 1;
    listOfInputs.children[index].style.display = 'block';
}

function addBtnShowMore() {
    btnShowMore = document.createElement('p');
    btnShowMore.setAttribute('id', 'show-more')
    btnShowMore.innerText = "Show More";
    btnShowMore.addEventListener('mousedown', showMore);
    return btnShowMore;
}

function showMore(e) {
    const currentInputs = e.path[1].children;
    for (let i = 0; i < currentInputs.length; i++) {
        currentInputs[i].style.display = 'block';
    }
    e.path[1].removeChild(e.target);
}

function deleteVisit() {
    btnDelete = document.createElement('div');
    btnDelete.setAttribute("id", "delete-visit");
    btnDelete.innerText = "";
    btnDelete.addEventListener('click', deleteVisBlock);
    return btnDelete;
}

function deleteVisBlock(e) {
    e.path[1].style.display = "none";


    const allCards = JSON.parse(localStorage.getItem("cards"));
    const temp = [];
    for (let i = 0; i < e.path[1].children.length; i++) {
        temp.push(e.path[1].children[i].textContent);
    }
    delete allCards[e.path[1].id];
    localStorage.setItem("cards", JSON.stringify(allCards));

    const positions = JSON.parse(localStorage.getItem("positions"));
    const tempPos = [];
    for (let i = 0; i < e.path[1].children.length; i++) {
        tempPos.push(e.path[1].children[i].textContent);
    }
    delete positions[e.path[1].id];
    localStorage.setItem("positions", JSON.stringify(positions));


    document.location.reload(true);
}

function clearAll(){
    localStorage.removeItem("cards");
    localStorage.removeItem("positions");

    document.location.reload(true);
}


function findCard() {
    if (document.querySelectorAll('.created-elements').length) {
        document.querySelectorAll('.created-elements').forEach((item) => {
            makeDragonDrop(item);
        })
    }
}

function makeDragonDrop(cardTarget) {
    let card = cardTarget;
    let cord = card.getBoundingClientRect();
    let dek = mainBlock.getBoundingClientRect();

    card.onmousedown = function(e) { 
                    
                    card.style.position = 'absolute';
                    moveAt(e);
        
                    mainBlock.appendChild(card);
                  
                    card.style.zIndex = 1000; 
        
                    document.onmousemove = function(e) {
                      moveAt(e);
                    }
                  
                    card.onmouseup = function() {
                      savePosition(card)
                  
                      document.onmousemove = null;
                  
                    }
                }
            
        

            function moveAt(e) {




                
                let cord = card.getBoundingClientRect();
                let dek = mainBlock.getBoundingClientRect();
                console.log(dek)
                if(e.screenY < dek.y *2 - cord.height/6){
                    card.style.top == dek.y * 2 +'px';
                }else if(e.screenY >dek.y + dek.width - cord.height/2){
                    card.style.top == dek.y + dek.widt - cord.height +'px';
                }
                else{
                    card.style.top =  e.clientY - dek.top - cord.height/2 -70  + 'px';

                }
        
                if(e.screenX < dek.x + cord.width/2){
                    card.style.left == dek.x   + "px";
                }else if(e.screenX> dek.x + dek.width - cord.width/2 ){
                    card.style.left == dek.x + dek.width - cord.width/2  + "px";
                }
                else{
                    card.style.left = e.clientX -  dek.left - cord.width/2 -35 + 'px';
                }
            }
        
            function savePosition(e){
                let positions;
            if (localStorage.getItem('positions') === null) {
                positions = [];
            } else {
                positions = JSON.parse(localStorage.getItem('positions'))
            }
            const temp = [];
        
                temp.push(e.style.top);
                temp.push(e.style.left);
        
            positions.splice(e.id,1,temp);
            localStorage.setItem('positions', JSON.stringify(positions))
        
            }
}
