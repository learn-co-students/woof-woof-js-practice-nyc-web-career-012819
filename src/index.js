window.addEventListener('DOMContentLoaded', (event) => {
  // some questions written: 1. line 54, 2. is it window. or document. in line 1?
  // also questions on src2 folder
  // variables
  const pupsUrl = 'http://localhost:3000/pups';
  const dogBarDiv = document.getElementById('dog-bar');
  const dogInfoDiv = document.getElementById('dog-info');
  const goodDogFilterBtn = document.getElementById('good-dog-filter');
  const dogSpan = document.createElement('span');
  let allPups; // to store pup API into a vairable

  // event listeners
  document.addEventListener('click', addDogInfo);
  dogInfoDiv.addEventListener('click', updateGoodness);

  // functions
  function listAllPups() {
    getPups().then(addPupsToBar)
    goodDogFilterBtn.addEventListener('click', toggleGoodDogFilter)
  }
  listAllPups();

  function addPupsToBar(pups) {
    allPups = pups; // to store pup API into a vairable
    if (goodDogFilterBtn.innerText.includes('OFF')) {
      pups.forEach(pup => {
        dogBarDiv.innerHTML += `<span class="pupBar" data-id=${pup.id}>${pup.name}</span>`;
      })
    } else if (goodDogFilterBtn.innerText.includes('ON')) {
      pups.filter(pup => pup.isGoodDog).forEach(puppy => {
        dogBarDiv.innerHTML += `<span class="pupBar" data-id=${puppy.id}>${puppy.name}</span>`;
      })
    }
  }

  function toggleGoodDogFilter() {
    dogBarDiv.innerHTML = '';

    if (goodDogFilterBtn.innerText.includes('OFF')) {
      goodDogFilterBtn.innerText = "Filter good dogs: ON";
      addPupsToBar(allPups);

    } else {
      goodDogFilterBtn.innerText = "Filter good dogs: OFF";
      addPupsToBar(allPups);
    }
  }

  function addDogInfo(e) {
    if (e.target.className === 'pupBar') {
      // foundPup = allPups.find(pup => {
      //   return parseInt(e.target.dataset.id) === pup.id;
      // })
      // to store pup API into a vairable
      fetchSinglePup(e.target.dataset.id)
      // instead, I fetch a single pup. Which one is faster??????????
      .then(pup => {
        dogInfoDiv.innerHTML = `
        <img src=${pup.image}>
        <h2>${pup.name}</h2>
        <button data-id=${pup.id}>${pup.isGoodDog ? 'Good Dog!' : 'Bad Dog!'}</button>
        `;
      })
    }
  }

  function updateGoodness(event) {
    if (event.target.nodeName === 'BUTTON') {
      if (event.target.innerText.includes('Good')) {
        event.target.innerText = 'Bad Dog!'
        booleanValue = false;
      } else {
        event.target.innerText = 'Good Dog!'
        booleanValue = true;
      }
      fetchPatchPup(event.target.dataset.id, booleanValue)
      .then(pup => {
        dogInfoDiv.innerHTML = `
        <img src=${pup.image}>
        <h2>${pup.name}</h2>
        <button data-id=${pup.id}>${pup.isGoodDog ? 'Good Dog!' : 'Bad Dog!'}</button>
        `;
      })
      .then(updateDogBar)
    }
  }

  function updateDogBar() {
    dogBarDiv.innerHTML = '';
    getPups().then(addPupsToBar);
  }

  // fetching section
  function getPups() {
    return fetch(pupsUrl).then(r => r.json())
  }

  function fetchSinglePup(id) {
    return fetch(pupsUrl+`/${id}`).then(r => r.json())
  }

  function fetchPatchPup(id, value) {
    return fetch(`${pupsUrl}/${id}`, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({isGoodDog: value})
    })
    .then(r => r.json())
  }

})
