
const BASEURL = 'http://localhost:3000/'
document.addEventListener('DOMContentLoaded', () => {
  fetchBaby()
})
// BABY
class Baby {
  constructor(due_date, mother, father) {
    this.due_date = due_date,
    this.mother = mother,
    this.father = father
  }
}
function fetchBaby() {
  fetch(BASEURL + 'babies/1')
  .then(resp => resp.json())
  .then(babyObject => {
    if (!babyObject.error) {
      document.getElementById('due_date_form').style.display = "none"
      let baby = new Baby(babyObject.due_date, babyObject.mother, babyObject.father)
      handleBaby(baby)
    }
    else {
      document.getElementById('due_date_form').style.display = "block"
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
}

function handleBaby(babyObject) {
  let formattedDate = babyObject.due_date.to_s
  debugger
  document.getElementById('due_date_form').style.display = "none"
  document.getElementById('baby-information').innerHTML = `
  <div class="card" style="width: 10rem;">
    <p>Due Date: ${formattedDate}</p>
    <p>Mother: ${babyObject.mother}</p>
    <p>Father: ${babyObject.father}</p>
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