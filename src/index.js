document.addEventListener('DOMContentLoaded', ()  => {
  const dogBar = document.querySelector('#dog-bar')
  const dogInfo = document.querySelector('#dog-info')

  function fetching() {
    return fetch('http://localhost:3000/pups').then(res => res.json())
  }

  fetching()
  .then(pups => {
    pups.forEach(pup => {
      dogBar.innerHTML += `<span>${pup.name}</span>`
    })
  })

  dogBar.addEventListener('click', (e => {
    let dogName = e.target.innerText
    fetching()
    .then(pups => {
      pups.forEach(pup => {
        if(pup.name === dogName) {
          let dogBehave = () => {if(pup.isGoodDog === true){return 'Good Dog!'} else {return 'Bad Dog!'}}
          dogInfo.innerHTML = `
          <img src=${pup.image}>
          <h2>${pup.name}</h2>
          <button class="behave" id="${pup.id}">${dogBehave()}</button>
          <button class='delete' id='${pup.id}'>Adopt</button>
          `

          const dogBtn = document.querySelector(".behave")

          dogBtn.addEventListener('click', (e => {
            // console.log(e)
            if (e.target.textContent === 'Good Dog!'){
                e.target.textContent = 'Bad Dog!'
                fetch(
                  `http://localhost:3000/pups/${dogBtn.id}`,
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
            }
            else {
              e.target.textContent = 'Good Dog!'

              fetch(
                `http://localhost:3000/pups/${dogBtn.id}`,
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

          const delBtn = document.querySelector('.delete')

          delBtn.addEventListener('click', () => {
            // console.log(e)
            fetch(`http://localhost:3000/pups/${delBtn.id}`,
            {
              method: 'DELETE'
            })
          })
        }
      })
    })
  }))


})
