
const BASEURL = 'http://localhost:3000/babies/1'

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
    fetch(BASEURL)
    .then(resp => resp.json())
    .then(babyObject => {
      let baby = new Baby(babyObject.id, babyObject.due_date, babyObject.mother, babyObject.father, babyObject.days_until_due, Math.floor(babyObject.days_until_due / 7))
      if (babyObject.error) {
        // remove appointment form
        baby.noBabyHandle()
      }
      else {
        // If the baby object is found, show appointment form
        baby.fetchImages()
        baby.thisBabyHandle()
      }
    })
  }
  fetchImages() {
    fetch(BASEURL)
    .then(resp => resp.json())
    .then(babyObj => {
      if (babyObj.images_urls.length === 0) {
        document.getElementById('images-loaded').remove()
      }
      else if (!babyObj.error) {
        babyObj.images_urls.forEach(img => {
          const imageDiv = document.createElement('div')
          let image = new Image()
          image.src = img
          image.classList.add('progress-image', 'm-3', 'rounded')
          image.addEventListener('click', Baby.imageResize)
          imageDiv.append(image)
          imageDiv.innerHTML += `<a href="#" onclick="deleteImage('${img[1]}')">Delete</a>`
          document.getElementById('images-loaded').append(imageDiv)
        })
      }
    })
  }

  noBabyHandle() {
    document.getElementById('name-form').style.display = "none"
    document.getElementById('view-names').style.display = "none"
    document.getElementById('images').style.display = "none"
    document.getElementById('appointment-form').style.display = "none"
  }

  thisBabyHandle() {
    document.getElementById('images').style.display = "block"
    document.getElementById('appointment-form').style.display = "block"
    document.getElementById('name-form').style.display = "block"
    this.handleBaby()
  }

  handleBaby() {
    // CREATE HTML FOR BABY INFORMATION DIV
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
    document.getElementById('intro-div').remove()
  }

  static newBaby() {
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

  static imageResize() {
    event.target.classList.toggle('progress-clicked')
  }
}
const newBabyWithId = new Baby(1)

document.addEventListener('DOMContentLoaded', ()=> {
  event.preventDefault()
  newBabyWithId.fetchBabyInformation()
})
function handleImage() {
  event.preventDefault()
  const formData = new FormData()
  formData.append('image', document.getElementById('image').files[0])
  fetch(BASEURL, {
    method: 'PUT',
    body: formData
  })
  .then(resp => resp.json())
  .then(babyObject => {
    babyObject.fetchBabyInformation()
  })
}
function deleteImage(imgId) {
  event.preventDefault()
  fetch(BASEURL + "/?" + new URLSearchParams({image_id: imgId}), {
    method: "DELETE"
  })
}


let babySizes = {
  38: ["images/size-images/poppy.png", "Poppy Seed"],
  37: ["images/size-images/apple.png", "Apple Seed"],
  36: ["images/size-images/sweet-pea.png", "Sweet Pea"],
  35: ["images/size-images/blueberries.png", "Blueberry"],
  34: ["images/size-images/raspberry.png", "Raspberry"],
  33: ["images/size-images/olive.png", "Olive"],
  32: ["images/size-images/prune.png", "Prune"],
  31: ["images/size-images/lime.png", "Lime"],
  30: ["images/size-images/plum.png", "Plum"],
  29: ["images/size-images/peach.png", "Peach"],
  28: ["images/size-images/lemon.png", "Lemon"],
  27: ["images/size-images/orange.png", "Naval Orange"],
  22: ['https://freesvg.org/img/Onion-Zwiebel-lineart1.png', "Onion"],
  21: ["images/size-images/sweet-potato.png", "Sweet Potato"],

  0: ["https://img.icons8.com/carbon-copy/100/000000/pumpkin--v2.png", "Ready to go!"]
}
