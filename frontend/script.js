
const BASEURL = 'http://localhost:3000/'
document.addEventListener('DOMContentLoaded', () => {
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
function fetchBaby() {
  // event.preventDefault()
  fetch(BASEURL + 'babies/1')
  .then(resp => resp.json())
  .then(babyObject => {
    if (!babyObject.error) {
      document.getElementById('due_date_form').style.display = "none"
      let baby = new Baby(babyObject.due_date, babyObject.mother, babyObject.father, babyObject.days_until_date, babyObject.weeks_until_date)
      handleBaby(baby)
    }
    else {
      document.getElementById('due_date_form').style.display = "none"
    }
  })
}

function newBaby() {
  event.preventDefault()
  let newBaby = {
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
    body: JSON.stringify(newBaby)
  })
  .then(resp => resp.json())
  .then(obj => {
    document.getElementById('due_date_form').style.display = "none"
  })
}

function handleBaby(babyObject) {
  document.getElementById('baby-information').innerHTML = `
  <div class="card" style="width: 10rem;">
    <p>Due Date: ${babyObject.due_date}</p>
    <p>Mother: ${babyObject.mother}</p>
    <p>Father: ${babyObject.father}</p>
    <p>Days Until: ${babyObject.days_until_date}
  </div>`
}
// APPOINTMENTS

function appointmentLoad() {
  document.getElementById('add-appointment').addEventListener('click', () => {
    document.getElementById('appointment-form').innerHTML = `
    <form>
      <input type="text" name="doctor-name" id="doctor-name" placeholder="Doctor Name">
      <input type="date" name="appointment-date" id="appointment-date" placeholder="Date">
      <input type="submit">
    </form>  `
  })
}