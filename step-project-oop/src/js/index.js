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
// Click on create 

function createVisit(){
    closeModal();
    document.querySelector(".main-block span").style.display = "none";
    
    let createdElem = document.createElement("div");
    createdElem.classList.add("created-elements");
    mainBlock.appendChild(createdElem);
    
    for(let i=0 ;i<listOfInputs.children.length; i++ ){
        if(listOfInputs.children[i].style.display == "block"){
        for(let k=0; k<listOfInputs.children[i].children.length;k++){
            createdElem.insertAdjacentHTML("beforeEnd", `<p>${listOfInputs.children[i].children[k].placeholder}:${listOfInputs.children[i].children[k].value}</p>` );
                        console.log(listOfInputs.children[i].children[k].value);

        }

        }

    }

    createdElem.style.display = "flex";

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
