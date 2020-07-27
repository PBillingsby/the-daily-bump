const NAMEURL = 'http://localhost:3000/names/'

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
}

function namesLoad() {
  fetch(NAMEURL)
  .then(resp=>resp.json())
  .then(names => {
    const nameDiv = document.getElementById('names')
    for (name in names) {
      handlenames(names[name], nameDiv)
    }
  })
}

function handlenames(nameObject, nameDiv) {
  let newName = document.createElement('div')
  newName.innerHTML = `
  <div id="name[${nameObject.id}]">
  <button onclick="toggleMeaning(${nameObject})" class="border">${nameObject.name}</button>
  </div>
  
  `
  nameDiv.append(newName)
}

function toggleMeaning(nameObject) {
  debugger
  document.getElementById(`name[${nameObject.id}]`).innerHTML = `
  <div class="row">
    <div class="col">
      <div class="collapse multi-collapse" id="name-div[${nameObject.id}]">
        <div class="card card-body">
          <p>${nameObject.meaning}</p>
        </div>
      </div>
    </div>
  </div>
  `
}