document.addEventListener('DOMContentLoaded', () => {
  const DOM = new Dom();
  DOM.addAllEventListeners();

  dogAdapter.fetch()
    .then(dogs => {
      dogs.forEach(attributes => new Dog(attributes));
      DOM.renderDogBar(Dog.all);
    });
});