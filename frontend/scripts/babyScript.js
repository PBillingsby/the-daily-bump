
const BASEURL = 'http://localhost:3000/babies'

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
    fetch(BASEURL + "/1")
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
          <img src="${babySizes[this.weeksUntilDue][0]}" name="${babySizes[this.weeksUntilDue][1]}" class="progress-image img m-4 opacity">
          <p><strong>Baby Size:</strong> ${babySizes[this.weeksUntilDue][1]}</p>
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
  fetchImages() {
    fetch(BASEURL + "/1")
    .then(resp => resp.json())
    .then(babyObj => {
      if (babyObj.images_urls.length === 0) {
        document.getElementById('images-loaded').remove()
      }
      else if (!babyObj.error) {
        babyObj.images_urls.forEach(img => {
          const imageDiv = document.createElement('div')
          imageDiv.id = `image[${img[1]}]`
          let image = new Image()
          image.src = img
          image.classList.add('progress-image', 'm-3', 'rounded')
          imageDiv.append(image)
          image.setAttribute('onclick',"addImageClickEvent()")
          imageDiv.innerHTML += `<a href="#" onclick="deleteImage('${img[1]}')">Delete</a>`
          document.getElementById('images-loaded').append(imageDiv)
        })
      }
    })
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
  fetch(BASEURL  + "/1", {
    method: 'PUT',
    body: formData
  })
  .then(resp => resp.json())
  .then(babyObject => {
    window.location.reload();
  })
}
function deleteImage(imgId) {
  event.preventDefault()
  fetch(BASEURL + `/1?image_id=${imgId}`, {
    method: "DELETE",
    body: JSON.stringify({img_id: imgId})
  })
  document.getElementById(`image[${imgId}]`).remove()
}

function addImageClickEvent() {
  debugger
  document.getElementById('images-loaded').innerText = `${event.target.innerHTML}`
  event.target.classList.toggle('progress-clicked')
}

let babySizes = {
  36: ["images/size-images/poppy.png", "Poppy Seed"], // DONE
  35: ["images/size-images/apple.png", "Apple Seed"], 
  34: ["images/size-images/sweet-pea.png", "Sweet Pea"], // DONE
  33: ["images/size-images/blueberries.png", "Blueberry"], // DONE
  32: ["images/size-images/raspberry.png", "Raspberry"], // DONE
  31: ["images/size-images/olive.png", "Olive"], // DONE
  30: ["images/size-images/prune.png", "Prune"], // DONE
  29: ["images/size-images/lime.png", "Lime"],  // DONE
  28: ["images/size-images/plum.png", "Plum"], // DONE
  27: ["images/size-images/peach.png", "Peach"], // DONE
  26: ["images/size-images/lemon.png", "Lemon"], // DONE
  25: ["images/size-images/orange.png", "Naval Orange"], // DONE
  24: ["images/size-images/avocado.png", "Avocado"],
  23: ["images/size-images/onion.png", "Onion"],
  22: ["images/size-images/sweet-potato.png", "Sweet Potato"],
  21: ["images/size-images/mango.png", "Mango"],
  20: ["images/size-images/banana.png", "Banana"],
  19: ["images/size-images/pomegranate.png", "Pomegranate"],
  18: ["images/size-images/papaya.png", "Papaya"],
  17: ["images/size-images/grapefruit.png", "Grapefruit"],
  16: ["images/size-images/canteloupe.png", "Canteloupe"],
  15: ["images/size-images/cauliflower.png", "Cauliflower"],
  14: ["images/size-images/lettuce.png", "Lettuce"],
  13: ["images/size-images/rutabaga.png", "Rutabaga"],
  12: ["images/size-images/eggplant.png", "Eggplant"],
  11: ["images/size-images/acorn-squash.png", "Acorn Squash"],
  10: ["images/size-images/cucumber.png", "Cucumber"],
  9: ["images/size-images/pineapple.png", "Pineapple"],
  8: ["images/size-images/k-squash.png", "Kabocha Squash"],
  7: ["images/size-images/durian.png", "Durian"],
  6: ["images/size-images/squash.png", "Butternut Squash"],
  5: ["images/size-images/coconut.png", "Coconut"],
  4: ["images/size-images/honeydew.png", "Honeydew Melon"],
  3: ["images/size-images/winter-melon.png", "Winter Melon"],
  2: ["images/size-images/pumpkin.png", "Pumpkin"],
  1: ["images/size-images/watermelon.png", "Watermelon"],
  0: ["images/size-images/jackfruit.png", "Jackfruit"] // DONE
}