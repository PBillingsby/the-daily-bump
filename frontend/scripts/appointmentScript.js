const APPOINTMENT_BASE_URL = 'http://localhost:3000/appointments/'

class Appointment {
  constructor(id, doctorName, appointmentDate, appointmentLocation, appointmentNotes) {
    this.id = id,
    this.doctorName = doctorName,
    this.appointmentDate = appointmentDate,
    this.appointmentLocation = appointmentLocation,
    this.appointmentNotes = appointmentNotes
  }
}
function clearAppointmentDiv() {
  document.getElementById('appointments').innerHTML = ""
  document.getElementById('new-appointment-form').innerHTML = ""
}
// WHEN ADD APPOINTMENT CLICKED, APPOINTMENT FORM APPENDED TO #appointment-form DIV
function appointmentFormLoad() {
  clearAppointmentDiv()
  document.getElementById('new-appointment-form').innerHTML = `
  <form id="appointmentForm" class="p-2 text-left" onsubmit="handleAppointment()">
      <label>Doctor Name</label>
      <input type="text" name="doctor-name" id="doctor-name" placeholder="Doctor Name">
      <label>Appointment Date</label>
      <input type="datetime-local" name="appointment-date" id="appointment-date" placeholder="Date">
      <label>Location</label>
      <input type="text" name="loction" id="location" placeholder="Location">
      <label>Additional Notes</label>
      <input type="text" id="notes" placeholder="Notes">
      <input type="submit">
  </form>`
}

function handleAppointment() {
  event.preventDefault()
  const appointment = {
    baby_id: 1,
    doctor_name: document.getElementById('doctor-name').value,
    appointment_date: document.getElementById('appointment-date').value,
    location: document.getElementById('location').value,
    appointment_information: document.getElementById('notes').value
  }
  fetch(APPOINTMENT_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(appointment)
  })
  .then(resp => 
    appointmentsLoad())
}

function appointmentsLoad() {
  clearAppointmentDiv()
  fetch(APPOINTMENT_BASE_URL)
  .then(resp => resp.json())
  .then(apts => {
    if (apts.error) {
      document.getElementById('appointments').innerHTML = `<h5>${apts.error}</h5>`
    }
    else {
      for (appointment in apts.data) {
        let dataArray = apts.data[appointment].attributes
        let formattedDateTime = dataArray.appointment_date.split('T')
        let time
        formattedDateTime[1].slice(0,2) > 12 ? time = "PM" : time = "AM"
        let newDateTime = new Date(formattedDateTime[0]).toLocaleDateString() + ' @ ' + formattedDateTime[1].slice(0,5) + time
        let newAppointment = new Appointment(dataArray.id, dataArray.doctor_name, newDateTime, dataArray.location, dataArray.appointment_information)
        appointmentHandle(newAppointment)
      }
    }
  })
}

function appointmentHandle(appointmentObject) {
  let ul = document.createElement('ul')
  ul.classList.add('list-group', 'list-group-horizontal')
  for (let attribute in appointmentObject) {
    let li = document.createElement('li')
    li.classList.add('appointment-attribute', 'list-group-item')
    let attributeStringSplit = attribute.match(/[A-Z]+[^A-Z]*|[^A-Z]+/g)
    if (attribute !== 'id') {
      li.innerHTML = `<p><strong>${attributeStringSplit.join(" ").toUpperCase()}:</strong> ${appointmentObject[attribute]}</p>`
    }
    else {
      li.innerHTML = `<a href="#" onclick="deleteAppointment(${appointmentObject[attribute]})" class="text-center">Delete</a><br>`
    }
    ul.appendChild(li)
  }
  document.getElementById('appointments').append(ul)
}


function deleteAppointment(appointmentId) {
  // event.preventDefault()
  fetch(APPOINTMENT_BASE_URL + appointmentId, {
    method: 'DELETE'})
    .then(resp => appointmentsLoad()
  )
}