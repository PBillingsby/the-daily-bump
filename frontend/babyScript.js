const BASEURL = 'http://localhost:3000/'
const localBabyObject = localStorage.getItem("babyObject")

document.addEventListener('DOMContentLoaded', () => {
  event.preventDefault()
  if (localBabyObject) {
    // If the baby object is in localStorage, show appointment form
    document.getElementById('appointment-form').style.display = "block"
    handleTimes(localBabyObject)
  }
  else {
    // Otherwise remove appointment form
    document.getElementById('appointment-form').style.display = "none"
  }
})

function handleTimes(babyObject) {
    let parsedDueDate = Date.parse(babyObject.due_date)
    let currentDateString = new Date()
    let parsedCurrentDate = Date.parse(currentDateString)
    let combinedDates = parsedDueDate - parsedCurrentDate
    babyObject.days_until_due = Math.floor(combinedDates / (1000 * 60 * 60 * 24))
    localStorage.setItem("babyObject", JSON.stringify(babyObject))
    debugger
    handleBaby(JSON.parse(babyObject))
}
// BABY
class Baby {
  constructor(baby_id, due_date, mother, father, days_until_due) {
    this.baby_id = baby_id,
    this.due_date = due_date,
    this.mother = mother,
    this.father = father,
    this.days_until_due = null
  }
}
function newBaby() {
  event.preventDefault()
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
  .then(resp => resp.json())
  .then(obj => {
    // Sets localStorage item babyObject with class constructed baby
    localStorage.setItem('babyObject', JSON.stringify(new Baby(...Object.values(obj))))
    handleBaby(JSON.parse(localStorage.babyObject))
  })
}


function handleBaby(babyObject) {
  // CREATE HTML FOR BABY INFORMATION DIV
    document.getElementById('baby-form').style.display = "none"
    document.getElementById('baby-card').innerHTML = `
  <div class="card bg-light mb-3">
    <div class="row no-gutters mx-auto">
      <div class="col-md-8">
        <div class="card-body">
          <strong>Due Date:</strong> ${babyObject.due_date}
          <strong>Mother:</strong>  ${babyObject.mother}
          <strong>Father:</strong> ${babyObject.father}
        </div>
      </div>
    </div>
  </div>`
}
let babySizes = {
  23: '<img src="https://freesvg.org/img/Onion-Zwiebel-lineart1.png" class="card-img" name="Onion">'
}