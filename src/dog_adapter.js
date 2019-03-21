const dogAdapter = (function() {
  const API_URL = 'http://localhost:3000';

  return {
    fetch: function() {
      return fetch(`${API_URL}/pups`).then(response => response.json());
    },
    update: function(dog) {
      return fetch(`${API_URL}/pups/${dog.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isGoodDog: !dog.isGoodDog })
        }
      );
    }
  }
})();