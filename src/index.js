document.addEventListener('DOMContentLoaded', () => {
  const dogBarDiv = document.querySelector('#dog-bar');
  const dogInfoBar = document.querySelector('#dog-info');
  const dogSummaryContainer = document.querySelector('#dog-summary-container');
  const url = 'http://localhost:3000/pups';
  const filterButton = document.querySelector('#good-dog-filter');

  function fetchAll() {
    return fetch(url)
    .then(function(data) {
      return data.json()
    })
    .then(function(jsonData) {
      return renderDAWGS(jsonData)
    })
  }

  function renderDAWGS(dogs) {
    dogBarDiv.innerHTML = ''
      dogs.forEach(function(dog) {
        dogBarDiv.innerHTML += `
        <span data-id=${dog.id}>${dog.name}</span>
        `
      })
  }

  dogBarDiv.addEventListener('click', function(e) {
    if(e.target.tagName === 'SPAN') {
      let id = parseInt(e.target.dataset.id);
      fetch(`http://localhost:3000/pups/${id}`)
      .then(function(data) {
        return data.json()
      }).then(function(dog) {
        dogInfoBar.innerHTML = `
        <img src= ${dog.image} >
        <h2>${dog.name}</h2>
        <button> ${dog.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>
        `
        let button = dogInfoBar.querySelector('button');
        button.addEventListener('click', function(e) {
          console.log(e)
          if(dog.isGoodDog === true) {
          fetch(`http://localhost:3000/pups/${dog.id}`, {
            method: "PUT",
            headers: {
              "Content-Type" : "application/json"
            },
            body: JSON.stringify({name: dog.name, id: dog.id, image: dog.image, isGoodDog: false})
          })
        } else {
          fetch(`http://localhost:3000/pups/${dog.id}`, {
            method: "PUT",
            headers: {
              "Content-Type" : "application/json"
            },
            body: JSON.stringify({name: dog.name, id: dog.id, image: dog.image, isGoodDog: true})
          })
        }

        })
      })
    }
  })


  filterButton.addEventListener('click', function() {
    if (filterButton.innerHTML === "Filter good dogs: OFF") {
      filterButton.innerHTML = "Filter good dogs: ON"
      fetch(url)
      .then(response => response.json())
      .then(data => data.filter(dog => dog.isGoodDog === true))
      .then(goodDog => renderDAWGS(goodDog))
    } else if (filterButton.innerHTML === "Filter good dogs: ON") {
      filterButton.innerHTML = "Filter good dogs: OFF"
      fetchAll()
    }
  })

  fetchAll();

})
