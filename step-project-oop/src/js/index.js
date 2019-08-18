// Get DOM Elements
const modal = document.querySelector('#visit-modal');
const modalBtn = document.querySelector('#modal-btn');
const closeBtn = document.querySelector('.close');

// Events
modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

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
    constructor(target, date, fullName){
        this.target = target;
        this.date = date;
        this.fullName = fullName;
    }

    static createVisit(doctor, arr){
        
    }
}

class VisitToCardiologist extends Visit{
    constructor(target,date, fullName,pressure, iWeight, diseases, age){
        super(target, date, fullName);
        this.pressure = pressure;
        this.iWeight = iWeight;
        this.diseases = diseases;
        this.age = age;
    }
}

class VisitToDentist extends Visit {
    constructor(target,date, fullName,dateLastVist){
        super(target, date, fullName);
        this.dateLastVist = dateLastVist;
    }
}

class VisitToTherapist extends Visit{
    constructor(target,date, fullName,age){
        super(target, date, fullName);
        this.age = age;
    }
}

const listOfDoctor = document.getElementById('list-of-doctors');
const listOfInputs = document.getElementById('form-inputs');

listOfDoctor.addEventListener('change', showEntry);

let index = 0;
function showEntry(e){
    listOfInputs.children[index].style.display = 'none';

    const nodes = Array.from(listOfDoctor.children);
    const doc = nodes.filter(i => i.value === e.target.value)
    
    index = nodes.indexOf(doc[0]) - 1;
    listOfInputs.children[index].style.display = 'block';
}

const createBtn = document.getElementsByClassName('.modal-footer');

createBtn.addEventListener('click', createVisit);

function createVisit(){
    
}
