document.addEventListener('DOMContentLoaded',function() {

  //variables
  const url = 'http://localhost:3000/pups';
  let dogBarDiv = document.querySelector('#dog-bar');
  const dogInfoDiv = document.querySelector('#dog-info');
  const dogButton = document.querySelector('.dog-btn');
  const goodFilter = document.getElementById("good-dog-filter")
  const filterDiv = document.querySelector('#filter-div');

  //fetch
  function fetchPups() {
    return fetch(url)
    .then(response => response.json())
    .then(pups => {
      dogBarDiv.innerHTML ="";
      pups.forEach(pup => {
        spanPup(pup);
      })
    })
  };

  //function
  function spanPup(pup) {
    dogBarDiv.innerHTML += `
      <span data-id=${pup.id}>${pup.name}</span>
      `
  };

  function showPup(pup) {
    dogInfoDiv.innerHTML = `
    <img src=${pup.image}>
    <h2>${pup.name}</h2>
    <button class="dog-btn" data-id=${pup.id}>${pup.isGoodDog ? "Good Dog": "Bad Dog"}</button>
    `
  };

  function findPupId(event) {
    const pupId = event.target.dataset.id
    return pupId;
  }

  //event listener
  dogBarDiv.addEventListener('click', event => {
    event.preventDefault();
    fetch(`${url}/${findPupId(event)}`)
    .then(response => response.json())
    .then(pup => {
      showPup(pup);
    })
  })

  dogInfoDiv.addEventListener('click', event => {
    const buttonName = event.target.className;
    let isGoodDog;

    if (buttonName === "dog-btn") {
      if (event.target.innerText === "Good Dog") {
        isGoodDog = false;
      } else {
        isGoodDog = true;
      }

      return fetch(`${url}/${findPupId(event)}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isGoodDog: isGoodDog
        })
      })
      .then(response => response.json())
      .then(pup => {
        showPup(pup)
      })
    }
  });//end of this event listener


  goodFilter.addEventListener('click', event => {
    // let filteredDogArr;
    dogBarDiv.innerHTML ="";
    if (event.target.innerText === "Filter good dogs: OFF") {
        event.target.innerText = "Filter good dogs: ON";
        fetch(`${url}`)
        .then(response => response.json())
        .then(pups => {
          pups.map(pup => {
            if (pup.isGoodDog === true) {
              spanPup(pup)
            }
          })
        })
    }   else {
        event.target.innerText = "Filter good dogs: OFF"
        fetch(`${url}`)
        .then(response => response.json())
        .then(pups => {
          pups.map(pup => {
            spanPup(pup)
          })
        })
      }//end of else
  })//end of this event listener

  fetchPups();
});//end of DOMContentLoaded
