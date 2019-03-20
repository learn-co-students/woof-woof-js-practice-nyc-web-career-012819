document.addEventListener('DOMContentLoaded', () => {
  const dogBar = document.querySelector('#dog-bar')
  const dogInfo = document.querySelector('#dog-info')


  fetch('http://localhost:3000/pups')
  .then(response => response.json())
  .then(pups => {
    pups.forEach(pup => {
      dogBar.innerHTML += `<span>${pup.name}</span>`
    })
  })

  dogBar.addEventListener('click', (e =>{
    let dogName = e.target.innerText
    fetch('http://localhost:3000/pups')
    .then(response => response.json())
    .then(pups => {
      pups.forEach(pup => {
        if (pup.name === dogName){
        let dogBehave = () => {
          if(pup.isGoodDog === true){
            return 'Good Dog!'
          }else {
            return 'Bad Dog!'}
          }
        dogInfo.innerHTML =
        `
        <img src=${pup.image}>
        <h2>${pup.name}</h2>
        <button class = 'behave' id=${pup.id}>${dogBehave()}</button>
        <button class = 'delete' id=${pup.id}>Run Away</button>
        `
        const dogButton = document.querySelector('.behave')
        console.log(dogButton);
        dogButton.addEventListener('click', (e => {
          if (e.target.innerHTML === 'Good Dog!'){
            e.target.innerHTML = 'Bad Dog!'
            fetch(
              `http://localhost:3000/pups/${dogButton.id}`,
              {
                method: 'PATCH',
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  isGoodDog: false,
                })
              }
            )
          }else {
            e.target.innerHTML = 'Good Dog!'

            fetch(
              `http://localhost:3000/pups/${dogButton.id}`,
              {
                method: 'PATCH',
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  isGoodDog: true,
                })
              }
            )
          }

        }))
        const dogDelete = document.querySelector('.delete')
        dogDelete.addEventListener('click', () => {
        fetch(
          `http://localhost:3000/pups/${dogDelete.id}`,
          {
            method: 'DELETE',
          })
        })
        }
      })
    })
  }))
})
