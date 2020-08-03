const NAMEURL = 'http://localhost:3000/names/'
class Name {
  constructor(name, meaning, definition, id) {
    this.name = name,
    this.meaning = meaning,
    this.definition = definition,
    this.id = id
  }
  
  static namesLoad() {
    const nameDiv = document.getElementById('view-names')
    fetch(NAMEURL)
    .then(resp=>resp.json())
    .then(names => {
      for (name in names) {
        // const newArr = Array.from(nameDiv.children)
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
    .then(obj => {
      const newName = new Name(obj.name, obj.meaning, obj.definition, obj.id)
      debugger
      toggleMeaning(newName)
    })
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
  Name.namesLoad()
  event.preventDefault()
})

function toggleMeaning(name) {
  let optionId
  !!name ? optionId = name.id : optionId = event.target.children[event.target.selectedIndex].value.match(/\d+/)[0]
  fetch(NAMEURL + optionId)
  .then(resp => resp.json())
  .then(name => {
    document.getElementById('content-results').innerHTML =
    `<div id="name-info"class="row name-transition">
      <div class="card card-body name-info"">
        <h4>Meaning of ${name.name}</h4>
        <p>${name.meaning}</p>
        <p>People think this name is: <strong>${name.definition}</strong></p>
        <a href="#" onclick="Name.deleteName(${name.id})" class="text-center">Delete</a>
      </div>
    </div>
    `
  })
}

