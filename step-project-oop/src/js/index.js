// Get DOM Elements
const modal = document.querySelector('#visit-modal');
const modalBtn = document.querySelector('#modal-btn');
const closeBtn = document.querySelector('.close');
const createBtn = document.querySelector('.modal-footer button');
const mainBlock = document.querySelector('.main-block');



// Events
modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);
createBtn.addEventListener('click', createVisit);
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

const listOfDoctor = document.getElementById('list-of-doctors');
const listOfInputs = document.getElementById('form-inputs');

class Visit {
    constructor(target, date, fullName) {
        this.target = target;
        this.date = date;
        this.fullName = fullName;
    }

    addCard() {
        let createdElem = document.createElement("ul");
        createdElem.classList.add("created-elements");
        mainBlock.appendChild(createdElem);
        for (let [key, value] of Object.entries(this)) {
            debugger
            const li = document.createElement('li');
            li.innerHTML = `${key}: ${value}`
            createdElem.appendChild(li);
        }
        createdElem.children[2].style.display = 'block';
        createdElem.style.display = "flex";
    }
}

class VisitToCardiologist extends Visit {
    constructor(target, date, fullName, pressure, iWeight, diseases, age) {
        super(target, date, fullName);
        this.pressure = pressure;
        this.iWeight = iWeight;
        this.diseases = diseases;
        this.age = age;
        this.id = 0;
    }
}

class VisitToDentist extends Visit {
    constructor(target, date, fullName, dateLastVist) {
        super(target, date, fullName);
        this.dateLastVist = dateLastVist;
        this.id = 1;
    }
}

class VisitToTherapist extends Visit {
    constructor(target, date, fullName, age) {
        super(target, date, fullName);
        this.age = age;
        this.id = 2;
    }
}

let index = 0;

function createVisit() {
    closeModal();
    document.querySelector(".main-block span").style.display = "none";
    
    const arr = [];
    let item = '';

    for (let i = 0; i < listOfInputs.children.length; i++) {
        if (listOfInputs.children[i].style.display == "block") {
            for (let k = 0; k < listOfInputs.children[i].children.length; k++) {
                arr.push(listOfInputs.children[i].children[k].value)
            }
        }
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
    clearInputs();
}

function clearInputs(){
    for(let i = 0; i < listOfInputs.children[index].children.length; i++){
        listOfInputs.children[index].children[i].value = '';
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
