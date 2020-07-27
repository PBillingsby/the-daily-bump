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
  event.preventDefault()
  let nameDiv = document.getElementById('view-names')
  fetch(NAMEURL)
  .then(resp=>resp.json())
  .then(names => {
    if (names.error) {
      nameDiv.style.display = "none"
    }
    else {
      for (name in names) {
        let opt = document.createElement('option')
        opt.appendChild(document.createTextNode(`${names[name].name}`) )
        opt.value = `name[${names[name].id}]`
        nameDiv.appendChild(opt)
      }
    }  
  })
}

function toggleMeaning() {
  let optionId = event.target.children[event.target.selectedIndex].value[5]
  fetch(NAMEURL + optionId)
  .then(resp => resp.json())
  .then(name => {
    document.getElementById('name-meaning').innerHTML +=
    `<div class="row">
      <div class="card card-body">
        <p>${name.meaning}</p>
      </div>
    </div>
    `
  })
}