class Dog {
  constructor({id, name, isGoodDog, image}) {
    this.id = id;
    this.name = name;
    this.isGoodDog = isGoodDog;
    this.imageURL = image;

    this.constructor.all.push(this);
  }

  goodDogStatus() {
    return (this.isGoodDog) ? 'Good Dog!' : 'Bad Dog!';
  }

  static findById(id) {
    return this.all.find(dog => dog.id === id);
  }
}

Dog.all = [];