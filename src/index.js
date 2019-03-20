document.addEventListener("DOMContentLoaded", () => {
const dogBarDiv = document.getElementById("dog-bar")
const dogInfoDiv = document.getElementById("dog-info")
dogBarDiv.addEventListener("click", function(e){
  if (e.target.className === "dog-button"){
    let dogNameId = e.target.dataset.id
    fetchDogInfo(dogNameId)
      .then(renderDogInfo)
  }
})
dogInfoDiv.addEventListener("click", function(e){
  let goodOrBad;
  if(e.target.className === "moral-btn"){
    let dogNameId = e.target.dataset.id
    if(e.target.id === 'true'){
      e.target.innerText = "bad dog"
       goodOrBad = {isGoodDog: false}
    } else if (e.target.id === 'false'){
      e.target.innerText = "good dog"
       goodOrBad = {isGoodDog: true}
    }
    patchDogData(dogNameId, goodOrBad)
  }
})

function patchDogData(dog ,data = {}){
  fetch(`http://localhost:3000/pups/${dog}`,{
    method: 'PATCH',
    body: JSON.stringify(data),
    headers:{
    'Content-Type': 'application/json'
  }
  })
  .then(response => response.json());
}

function fetchDogInfo(dogName){
  return fetch(`http://localhost:3000/pups/${dogName}`)
 .then(res => res.json())
}

function fetchData(func){
   fetch("http://localhost:3000/pups")
  .then(res => res.json())
  .then(func)
}

function renderAllName(dogs){
  dogBarDiv.innerHTML = " "
  dogs.forEach(renderName)
}

function renderName(dog){
  dogBarDiv.innerHTML += `
  <span data-id="${dog.id}" class=dog-button>${dog.name}</span>
  `
}

function renderDogInfo(dog){
  console.log(dog)
  dogInfoDiv.innerHTML = `
  <h2>${dog.name}</h2>
  <img src= ${dog.image}>
  <button data-id="${dog.id}" id="${dog.isGoodDog}"class="moral-btn">${dog.isGoodDog ? "good dog" : "bad dog"}</button>
  `
}





fetchData(renderAllName)










})
