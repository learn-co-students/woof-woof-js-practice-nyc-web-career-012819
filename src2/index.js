document.addEventListener('DOMContentLoaded', Puppy.init)
// how to do DOMContentLoaded for classes
// in constructor, is it obj or else?
class Puppy {

  constructor(obj) {
    this.id = obj.id
    this.name = obj.name
    this.isGoodDog = obj.isGoodDog
    this.image = obj.image
  }

  init() {
    
  }

}
