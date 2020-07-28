const BASEURL = 'http://localhost:3000/babies/'
document.addEventListener('DOMContentLoaded', () => {
  event.preventDefault()
  let baby = new Baby()
  baby.fetchBabyInformation()
})
class Baby {
  constructor(babyId, dueDate, mother, father, daysUntilDue, weeksUntilDue) {
    this.babyId = babyId,
    this.dueDate = dueDate,
    this.mother = mother,
    this.father = father,
    this.daysUntilDue = daysUntilDue,
    this.weeksUntilDue = weeksUntilDue
  }

  fetchBabyInformation() {
    fetch(BASEURL + '1')
    .then(resp => resp.json())
    .then(babyObject => {
      let baby = new Baby(babyObject.id, babyObject.due_date, babyObject.mother, babyObject.father, babyObject.days_until_due, Math.floor(babyObject.days_until_due / 7))
      if (babyObject.error) {
        // remove appointment form
        document.getElementById('introduction').style.display = "block"
        document.getElementById('name-form').style.display = "none"
        document.getElementById('names').style.display = "none"
        document.getElementById('images').style.display = "none"
        document.getElementById('appointment-form').style.display = "none"
      }
      else {
        // If the baby object is found, show appointment form
        document.getElementById('appointment-form').style.display = "block"
        document.getElementById('introduction').style.display = "none"
        document.getElementById('name-form').style.display = "block"
        baby.handleBaby()
      }
    })
  }

  handleBaby() {
    // CREATE HTML FOR BABY INFORMATION DIV
      document.getElementById('baby-form').style.display = "none"
      const formattedDate = this.dueDate.split('-')
      document.getElementById('baby-card').innerHTML = `
    <div class="card bg-baby-green text-center">
      <div class="row">
        <div class="col">
          <img src="${babySizes[this.weeksUntilDue][0]}" name="${babySizes[this.weeksUntilDue][1]}" class="card-img">
          <sub><strong>Baby Size:</strong> ${babySizes[this.weeksUntilDue][1]}</sub>
        </div>
        <div class="col-lg-8 pt-4" id="main-baby-information">
          <div class="card-body d-inline-flex text-center mx-auto">
            <span class="p-3 m-2 border mx-auto"><h6>Due Date</h6> <p>${formattedDate[1]}/${formattedDate[2]}/${formattedDate[0]}</p></span>
            <span class="p-3 m-2 border mx-auto"><h6>Mother</h6> <p>${this.mother}</p></span>
            <span class="p-3 m-2 border mx-auto"><h6>Father</h6> <p>${this.father}</p></span>
            <span class="p-3 m-2 border mx-auto"><h6>Weeks Until Due</h6> <p class="text-center">${Math.floor(this.weeksUntilDue)}</p></span>
            <span class="p-3 m-2 border mx-auto"><h6>Days Until Due</h6> <p class="text-center">${this.daysUntilDue}</p></span>
          </div>
        </div>
      </div>
    </div>`
  }
}


function newBaby() {
  event.preventDefault()
  let baby = {
    due_date: document.getElementById('due_date').value,
    mother: document.getElementById('mother_name').value,
    father: document.getElementById('father_name').value
  }
  fetch(BASEURL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(baby)
  })
  .then(resp => resp.json())
  .then(obj => {
    document.getElementById('appointment-form').style.display = "block"
    let baby = new Baby(obj.id, obj.due_date, obj.mother, obj.father, obj.days_until_due, Math.floor(obj.days_until_due / 7))
    baby.fetchBabyInformation()
  })
}




function handleImage() {
  event.preventDefault()
  const formData = new FormData()
  formData.append('image', document.getElementById('image').files[0])
  fetch(BASEURL + "1", {
    method: 'PUT',
    body: formData
  })
  .then(resp => resp.json())
  .then(baby => {debugger})
}

let babySizes = {
  22: ['https://freesvg.org/img/Onion-Zwiebel-lineart1.png', "Onion"],
  74: ['https://freesvg.org/img/Onion-Zwiebel-lineart1.png', "Onion"]
}