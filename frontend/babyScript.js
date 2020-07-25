const BASEURL = 'http://localhost:3000/'
document.addEventListener('DOMContentLoaded', () => {
  const localBabyObject = localStorage.getItem("babyObject")
  event.preventDefault()
  if (localBabyObject) {
    document.getElementById('appointment-form').style.display = "block"
  }
  if (localBabyObject) {
    handleBaby(JSON.parse(localBabyObject))
  }
})
    
// BABY
class Baby {
  constructor(baby_id, due_date, mother, father) {
    this.baby_id = baby_id,
    this.due_date = due_date,
    this.mother = mother,
    this.father = father
    // this.weeks_until_date = weeks_until_date,
    // this.days_until_date = days_until_date
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
    localStorage.setItem('babyObject', JSON.stringify(new Baby(...Object.values(obj))))
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