const NAMEURL = 'http://localhost:3000/names/'
class Name {
  constructor(name, meaning, definition, id) {
    this.name = name,
    this.meaning = meaning,
    this.definition = definition,
    this.id = id
  }
  toggleMeaning() {
    let optionId
    !!this ? optionId = this.id : optionId = event.target.children[event.target.selectedIndex].value.match(/\d+/)[0]
    fetch(NAMEURL + optionId)
    .then(resp => resp.json())
    .then(name => {
      document.getElementById('content-results').innerHTML =
      `<div id="name-info"class="row name-transition">
        <div class="card card-body name-info"">
          <h2>${name.name}</h2><hr >
          <h5>Meaning</h5>
          <p>${name.meaning}</p><hr>
          <p>Usage: ${name.usage}</p><hr>
          <p>People think this name is: ${name.definition}</p>
          <a href="#" onclick="Name.deleteName(${name.id})" class="text-center">Delete</a>
        </div>
      </div>
      `
      Name.namesLoad()
    })
  }
  static namesLoad() {
    const nameDiv = document.getElementById('view-names')
    nameDiv.innerHTML = ""
    fetch(NAMEURL)
    .then(resp=>resp.json())
    .then(names => {
      nameDiv.innerHTML += `<option selected disabled value>View Saved Names</option>`
      for (name in names) {
        let opt = document.createElement('option')
        if (name === "error") {
          nameDiv.children[0].innerText = names[name]
        }
        else {
          opt.appendChild(document.createTextNode(`${names[name].name}`) )
          opt.id = `name[${names[name].id}]`
          opt.value = `name[${names[name].id}]`
          nameDiv.appendChild(opt)
        }
      }
    })
  }
  static babyNameSearch() {
    event.preventDefault()
    fetch(NAMEURL, {
      method: "POST",
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify({name: document.getElementById('add-name').value})
    })
    .then(resp => resp.json())
    .then(nameObj => {
      const newName = new Name(nameObj.name, nameObj.meaning, nameObj.definition, nameObj.id)
      newName.toggleMeaning()
    })
    event.target.querySelector('input').value = ""

  }
  static deleteName(nameId) {
    event.preventDefault()
    document.getElementById(`name[${nameId}]`).remove()
    event.target.parentNode.remove()
    fetch(NAMEURL + nameId, {
      method: "DELETE"
    })
  }
}
document.addEventListener('DOMContentLoaded', () => {
  event.preventDefault()

  Name.namesLoad()
})

const handleNameClick = () => {
  const nameId = event.target.children[event.target.selectedIndex].value.match(/\d+/)[0]
  fetch(NAMEURL + nameId)
  .then(resp => resp.json())
  .then(nameObject => {
    const name = new Name(nameObject.name, nameObject.meaning, nameObject.definition, nameObject.id)
    name.toggleMeaning()
  })
}



