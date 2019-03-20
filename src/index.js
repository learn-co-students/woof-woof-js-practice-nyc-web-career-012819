document.addEventListener('DOMContentLoaded', function() {
  console.log('dom has loaded')
  const dogBarDiv = document.querySelector('#dog-bar')
  const dogInfoDiv = document.querySelector('#dog-info')
  const filterButton = document.querySelector('#good-dog-filter')


  function fetchAllPups() {
    return fetch('http://localhost:3000/pups')
    .then(response => response.json())
    .then(data => renderAllPups(data))
  }

  function renderAllPups(data){
    dogBarDiv.innerHTML = '';
    data.forEach(function(dog) {
      dogBarDiv.innerHTML += `
      <span data-id = ${dog.id}> ${dog.name} </span>
      `
    })
  }

  dogBarDiv.addEventListener('click', function() {
    if (event.target.tagName === 'SPAN'){
      let id = parseInt(event.target.dataset.id)
      fetch(`http://localhost:3000/pups/${id}`)
      .then(response => response.json())
      .then(json => renderSinglePup(json))
    }
  })

  function renderSinglePup(dog){
    dogInfoDiv.innerHTML = `
    <img src = ${dog.image}>
    <h2> ${dog.name} </h2>
    <button> ${dog.isGoodDog? 'Good Dog!' : 'Bad Dog!'} </button>
    `

    const button = dogInfoDiv.querySelector('button');
    button.addEventListener('click', function(){
      if (dog.isGoodDog === true){
        fetch(`http://localhost:3000/pups/${dog.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({name: dog.name, id: dog.id, image: dog.image, isGoodDog: false})
        })
      } else {
        fetch(`http://localhost:3000/pups/${dog.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({name: dog.name, id: dog.id, image: dog.image, isGoodDog: true})
        })
      }
    })
  }

  filterButton.addEventListener('click', function(){
    if (filterButton.innerHTML === "Filter good dogs: OFF"){
      filterButton.innerHTML = "Filter good dogs: ON"
      fetch('http://localhost:3000/pups')
      .then(response => response.json())
      .then(data => data.filter(dog => dog.isGoodDog === true))
      .then(goodDog => renderAllPups(goodDog))
    } else if (filterButton.innerHTML === "Filter good dogs: ON") {
      filterButton.innerHTML = "Filter good dogs: OFF"
      fetchAllPups()
    }
  })


  fetchAllPups()
})
