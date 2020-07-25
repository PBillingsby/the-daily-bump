const BASEURL = 'http://localhost:3000/'
let localBabyObject = localStorage.getItem("babyObject")

document.addEventListener('DOMContentLoaded', () => {
  event.preventDefault()
  
  if (localBabyObject) {
    // If the baby object is in localStorage, show appointment form
    document.getElementById('appointment-form').style.display = "block"
    handleTimes(JSON.parse(localBabyObject))
  }
  else {
    // Otherwise remove appointment form
    document.getElementById('appointment-form').style.display = "none"
  }
})

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
    document.getElementById('appointment-form').style.display = "block"

    handleTimes(obj)
  })
}

function handleTimes(babyObject) {
  let parsedDueDate = Date.parse(babyObject.due_date)
  let parsedCurrentDate = Date.parse(new Date())
  // Calculates dates
  let calculatedDates = Math.floor((parsedDueDate - parsedCurrentDate) / (1000 * 60 * 60 * 24))
  babyObject["days_until_due"] = calculatedDates
  window.localStorage.setItem('babyObject', JSON.stringify(babyObject))
  handleBaby(babyObject)
}

function handleBaby(babyObject) {
  let months_until_due = Math.floor(JSON.parse(localBabyObject).days_until_due / 7)
  // CREATE HTML FOR BABY INFORMATION DIV
    document.getElementById('baby-form').style.display = "none"
    document.getElementById('baby-card').innerHTML = `
  <div class="card bg-light">
    <div class="row no-gutters">
      <div class="col p-2">
        <img src="${babySizes[months_until_due][0]}" name="${babySizes[months_until_due][1]}" class="card-img text-center">
        <sub><strong>Baby Size:</strong> ${babySizes[months_until_due][1]}</sub>
        </div>
      <div class="col-lg-8 pt-3">
        <div class="card-body d-inline-flex text-center">
          <span class="p-3 m-2 border mx-auto"><h5>Due Date</h5> <p>${babyObject.due_date}</p></span>
          <span class="p-3 m-2 border mx-auto"><h5>Mother</h5> <p>${babyObject.mother}</p></span>
          <span class="p-3 m-2 border mx-auto"><h5>Father</h5> <p>${babyObject.father}</p></span>
          <span class="p-3 m-2 border mx-auto"><h5>Days Until Due</h5> <p class="text-center">${babyObject.days_until_due}</p>

        </div>
      </div>
    </div>
  </div>`
  // HANDLES localBabyObject AFTER CREATION
  if (!localBabyObject) {
    location.reload()
  }
}
let babySizes = {
  22: ['https://freesvg.org/img/Onion-Zwiebel-lineart1.png', "Onion"]
}