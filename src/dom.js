class Dom {
  constructor() {
    this.dogInfo = document.getElementById('dog-info');
    this.dogBar = document.getElementById('dog-bar');
    this.goodDogFilter = document.getElementById('good-dog-filter');
    this.currentlyFiltered = false;
  }

  addAllEventListeners() {
    this.dogBar.addEventListener('click', this.handleShowMoreInfo.bind(this));
    this.dogInfo.addEventListener('click', this.handleToggleGoodDogStatus.bind(this));
    this.goodDogFilter.addEventListener('click', this.handleFilterGoodDogs.bind(this));
  }

  handleShowMoreInfo(event) {
    if (event.target.tagName === 'SPAN') {
      const clickedDog = Dog.findById(parseInt(event.target.dataset.id));
      this.renderMoreInfo(clickedDog);
    }
  }

  handleToggleGoodDogStatus(event) {
    if (event.target.tagName === 'BUTTON') {
      const dog = Dog.findById(parseInt(event.target.dataset.id));
      dogAdapter.update(dog)
        .then(response => {
          if (response.ok) { 
            dog.isGoodDog = !dog.isGoodDog;
            this.renderMoreInfo(dog);
          }
        });
    }
  }

  handleFilterGoodDogs(event) {
    if (this.currentlyFiltered) {
      this.renderDogBar(Dog.all);
    } else {
      const goodDogs = Dog.all.filter(dog => { return dog.isGoodDog === true; });
      this.renderDogBar(goodDogs);
    }

    this.toggleGoodDogFilter();
  }

  toggleGoodDogFilter() {
    if (this.currentlyFiltered) {
      this.goodDogFilter.innerText = 'Filter good dogs: OFF';
    } else {
      this.goodDogFilter.innerText = 'Filter good dogs: ON';
    }

    this.currentlyFiltered = !this.currentlyFiltered;
  }

  renderDogBar(dogs) {
    this.dogBar.innerHTML = '';
    dogs.forEach(dog => this.dogBar.appendChild(this.createDogBarElement(dog)));
  }

  createDogBarElement(dog) {
    const span = document.createElement('span');
    span.innerText = dog.name;
    span.setAttribute('data-id', dog.id);
    return span;
  }

  renderMoreInfo(dog) {
    this.dogInfo.innerHTML = 
      `<img src="${dog.imageURL}" />` +
      `<h2>${dog.name}</h2>` +
      `<button data-id=${dog.id}>${dog.goodDogStatus()}</button>`;
  }
}