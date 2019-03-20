document.addEventListener('DOMContentLoaded', () => {
  const dogBarDiv = document.getElementById('dog-bar');
  const dogInfoDiv = document.getElementById('dog-info');
  const goodDogFilter = document.getElementById('good-dog-filter');
  const API_URL = 'http://localhost:3000/pups';

  function fetchDogInfo(dogId){
    return fetch(`${API_URL}/${dogId}`)
    .then(resp => resp.json())
  }

  function renderDogInfo(dog){
    dogInfoDiv.innerHTML = `
    <h2>${dog.name}</h2>      
    <img src='${dog.image}'>
    <button data-id="${dog.id}" class="morale-btn">${dog.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>
    `;
  }

  function fetchDogData(url){
    fetch(url).then((resp) => {
      return resp.json();
    }).then(renderAllDogs)
  };

  function renderAllDogs(dogs){
    dogBarDiv.innerHTML = '';
    dogs.forEach(renderDog);
  };

  function renderDog(dog){
    dogBarDiv.innerHTML += `<span data-id="${dog.id}" class='dog-button'>${dog.name}</span>`
  };

  function patchDog(dog, data){
    fetch(`${API_URL}/${dog.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
  }

  function toggleDog(dogId){
    fetchDogInfo(dogId).then((dog) => {
      if(dog.isGoodDog){
        let data = {isGoodDog: false};
        patchDog(dog, data);
      } else {
        let data = {isGoodDog: true};
        patchDog(dog, data);
      }
    })
  }

  function filterDogs(){
    fetch(API_URL)
    .then(resp => resp.json())
    .then((dogs) => {
      let filteredDogs = dogs.filter(dog => dog.isGoodDog)
      return filteredDogs;
    }).then(renderAllDogs)
  }

  dogBarDiv.addEventListener('click', (e) => {
    if(e.target.className === 'dog-button'){
      let dogId = e.target.dataset.id;
      fetchDogInfo(dogId).then(renderDogInfo);
    }
  });

  dogInfoDiv.addEventListener('click', (e) => {
    if(e.target.className === 'morale-btn'){
      if (e.target.innerText === "Good Dog!"){
        toggleDog(e.target.dataset.id);
        e.target.innerText = "Bad Dog!";
      } else {
        toggleDog(e.target.dataset.id);
        e.target.innerText = "Good Dog!";
      }
    }
  });

  goodDogFilter.addEventListener('click', (e) => {
    if(e.target.innerText === "Filter good dogs: ON"){
      e.target.innerText = "Filter good dogs: OFF"
      fetchDogData(API_URL);
    } else {
      e.target.innerText = "Filter good dogs: ON"
      filterDogs();
    }
  });

  fetchDogData(API_URL);

});
