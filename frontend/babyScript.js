const BASEURL = 'http://localhost:3000/'
const baby = []


document.addEventListener('DOMContentLoaded', () => {
  event.preventDefault()
  fetchBaby()
})
    
// BABY
class Baby {
  constructor(due_date, mother, father, days_until_date, weeks_until_date) {
    this.due_date = due_date,
    this.mother = mother,
    this.father = father,
    this.days_until_date = days_until_date,
    this.weeks_until_date = weeks_until_date
  }
}
function newBaby() {

  let baby = {
    due_date: document.getElementById('due_date').value,
    mother: document.getElementById('mother_name').value,
    father: document.getElementById('father_name').value
  }
  fetch(BASEURL + 'babies', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(baby)
  })
  // REMOVES BABY FORM AND FETCHES CREATED BABY
  .then(resp => resp.json())
  .then(obj => {
    fetchBaby()
  })
}

function fetchBaby() {
  fetch(BASEURL + 'babies/1')
  .then(resp => resp.json())
  // IF BABY EXISTS CREATE NEW BABY OBJECT AND SEND TO handleBaby() FUNCTION
  .then(babyObject => {
    if (!babyObject.error) {
      let newBaby = new Baby(babyObject.due_date, babyObject.mother, babyObject.father, babyObject.days_until_date, babyObject.weeks_until_date)
      baby.push(newBaby)
      if (baby.length > 0) {
        handleBaby(baby[0])
      }
    }
  })
}


function handleBaby(babyObject) {
  // CREATE HTML FOR BABY INFORMATION DIV
    document.getElementById('baby-form').style.display = "none"
    document.getElementById('baby-card').innerHTML = `
  <div class="card p-1" style="width: 10rem;">
    ${babySizes[babyObject.weeks_until_date]}
    <strong>Due Date:</strong> <p>${babyObject.due_date}</p>
    <strong>Mother:</strong>  <p>${babyObject.mother}</p>
    <strong>Father:</strong> <p>${babyObject.father}</p>
    <strong>Days Until:</strong> <p>${babyObject.days_until_date}</p>
    <strong>Weeks Until:</strong> <p>${babyObject.weeks_until_date}</p>
  </div>`
}
let babySizes = {
  23: '<img src="https://freesvg.org/img/Onion-Zwiebel-lineart1.png" class="card-img-top" name="Onion">'
}