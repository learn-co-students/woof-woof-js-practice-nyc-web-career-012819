class Fetcher {

  static getPups() {
    return fetch(pupsUrl)
      .then(r => r.json())
  }

  static fetchSinglePup(id) {
    // argument passed in !!!!!!!!!!!!!
    return fetch(pupsUrl+`/${id}`)
      .then(r => r.json())
  }

  static fetchPatchPup(id, value) {
    // argument passed in !!!!!!!!!!!!!
    return fetch(`${pupsUrl}/${id}`, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({isGoodDog: value})
    })
    .then(r => r.json())
  }

}
