document.addEventListener('DOMContentLoaded', () => {
  const dogBarDiv = document.querySelector('#dog-bar')
  const dogInfoDiv = document.querySelector('#dog-info')
  const filter = document.querySelector('#good-dog-filter')
///////// ADD PUPS TO DOGBAR and show dog///////////

const allOfEm = () => {

  fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
    .then(json => {
      json.forEach(dog => {
        var newSpan = document.createElement('span')
        newSpan.innerText = dog.name
        dogBarDiv.append(newSpan)

        newSpan.addEventListener('click', () => {
          if (dog.isGoodDog === true) {
            dogInfoDiv.innerHTML = `
            <img src=${dog.image}>
            <h2>${dog.name}</h2>
            <button id=${dog.id} class="gbbtn">Good Dog!</button>
            `
          } else {
            dogInfoDiv.innerHTML = `
            <img src=${dog.image}>
            <h2>${dog.name}</h2>
            <button id=${dog.id} class="gbbtn">Bad Dog!</button>
            `
          }
        })
      })
    })
};
///////// ADD PUPS TO DOGBAR and show dog///////////
  document.addEventListener('click', (e) => {
    if (e.target.className === 'gbbtn') {
      if (e.target.innerText === 'Good Dog!') {
        fetch(`http://localhost:3000/pups/${e.target.id}`, {
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            "isGoodDog": false
          })
        })
          .then(resp => resp.json())
          .then(json => {
            document.getElementById(e.target.id).innerText = 'Bad Dog!'
          })
      } else {
        fetch(`http://localhost:3000/pups/${e.target.id}`, {
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            "isGoodDog": true
          })
        })
          .then(resp => resp.json())
          .then(json => {
            document.getElementById(e.target.id).innerText = 'Good Dog!'
          })
      }
    }
  })

  filter.addEventListener('click', (e) => {
    const reg = /[A-Z]{3}/
    const str = e.target.innerText
    if (reg.test(str.split(' ').slice(-1)[0])) {
      e.target.innerText = 'Filter good dogs: ON'
      fetch('http://localhost:3000/pups')
        .then(resp => resp.json())
        .then(json => {
          dogBarDiv.innerHTML = ''
          json.forEach(dog => {
            if (dog.isGoodDog) {
            var newSpan = document.createElement('span')
            newSpan.innerText = dog.name
            dogBarDiv.append(newSpan)

            newSpan.addEventListener('click', () => {
                dogInfoDiv.innerHTML = `
                <img src=${dog.image}>
                <h2>${dog.name}</h2>
                <button id=${dog.id} class="gbbtn">Good Dog!</button>
                `
              })
            }
          })
        })
    } else {
        e.target.innerText = 'Filter good dogs: OFF'
        dogBarDiv.innerHTML = ''
        allOfEm()
      }
  })
allOfEm()
})
