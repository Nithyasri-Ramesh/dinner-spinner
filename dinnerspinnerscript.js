let savedData= localStorage.getItem('myDinnerOptions');
let options= ["Pizza 🍕", "Tacos 🌮", "Sushi 🍣", "Burgers 🍔", "Chicken 🍗", "Noodles 🍜", "Egg 🥚"];

const decideBtn=document.getElementById('decide-btn');
const addBtn=document.getElementById('add-btn');
const resultDisplay=document.getElementById('result-display');
const foodInput= document.getElementById('food-input');
const listDisplay= document.getElementById('options-list');

function renderList() {
  listDisplay.innerHTML="";
  options.forEach((item,index) => {
    const li=document.createElement('li');
    li.innerHTML= `<span>${item}</span>
                   <button class="delete-btn" onclick="deleteItem(${index})">X</button>`;
    listDisplay.appendChild(li);
  });
}

addBtn.addEventListener('click', () => {
  const newItem= foodInput.value.trim();
  if (newItem !== "") {
    options.push(newItem);
    saveAndRefresh();
    foodInput.value="";
  }
});

function deleteItem(index){
  options.splice(index,1);
  saveAndRefresh();
}

function saveAndRefresh() {
  localStorage.setItem('myDinnerOptions', JSON.stringify(options));
  renderList();
}

decideBtn.addEventListener('click', () => {
  if (options.length==0) {
    alert("Add some options first!");
    return;
  }
  decideBtn.disabled=true;
  let counter=0;
  const spin=setInterval(() => {
    const tempIndex=Math.floor(Math.random() * options.length);
    resultDisplay.innerText = options[tempIndex];
    counter++;
    if (counter > 15) {
      clearInterval(spin);
      const finalIndex= Math.floor(Math.random() * options.length);
      resultDisplay.innerText= "⭐ " + options[finalIndex] + " ⭐";
      decideBtn.disabled=false;
   }
  }, 70);
});

renderList(); 