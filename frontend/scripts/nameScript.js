const NAMEURL = 'http://localhost:3000/names/'
class Name {
  constructor(name) {
    this.name = name
  }
}
document.addEventListener('DOMContentLoaded', () => {
  event.preventDefault()
})

function babyNameSearch() {
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
    toggleMeaning(obj)
  })
}
function namesLoad() {
  fetch(NAMEURL)
  .then(resp=>resp.json())
  .then(names => {
    if (names.error) {
      // nameDiv.style.display = "none"
    }
    else {
      let nameDiv = document.getElementById('view-names')
      for (name in names) {
        let opt = document.createElement('option')
        opt.appendChild(document.createTextNode(`${names[name].name}`) )
        opt.id = `name[${names[name].id}]`
        opt.value = `name[${names[name].id}]`
        nameDiv.appendChild(opt)
      }
    }  
  })
  // let selectedOptions = document.getElementById('view-names').querySelectorAll('option')
  // debugger
}

function toggleMeaning(nameObject) {
  if (document.getElementById('name-info')) {
    document.getElementById('name-info').remove()
  }  
  // IF nameObject passed through function, use id, else use select option value
  let optionId 
  !!nameObject ? optionId = nameObject.id : optionId = event.target.children[event.target.selectedIndex].value.match(/\d+/)[0]
  fetch(NAMEURL + optionId)
  .then(resp => resp.json())
  .then(name => {
    document.getElementById('selected-name').innerHTML =
    `<div id="name-info"class="row name-transition">
      <div class="card card-body name-info"">
        <h4>Meaning of ${name.name}</h4>
        <p>${name.meaning}</p>
        <a href="#" onclick="deleteName(${name.id})">Delete</a>
      </div>
    </div>
    `
  })
}

function deleteName(nameId) {
  event.preventDefault()
  fetch(NAMEURL + nameId, {
    method: "DELETE"
  })
  document.getElementById(`name[${nameId}]`).remove()
  event.target.parentNode.remove()
}