const APPOINTMENT_BASE_URL = 'http://localhost:3000/appointments'

class Appointment {
  constructor(doctorName, appointmentDate, appointmentLocation, appointmentNotes) {
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
  event.preventDefault()
  document.getElementById('new-appointment-form').innerHTML = `
  <form id="appointmentForm" class="p-2 text-right" onsubmit="handleAppointment()">
    <div class="form-group">
      <label>Doctor Name</label>
      <input type="text" name="doctor-name" id="doctor-name" placeholder="Doctor Name">
    </div>
    <div class="form-group">
      <label>Appointment Date</label>
      <input type="datetime-local" name="appointment-date" id="appointment-date" placeholder="Date">
    </div>
    <div class="form-group">
      <label>Location</label>
      <input type="text" name="loction" id="location" placeholder="Location">
    </div>
    <div class="form-group text-right">
      <label>Additional Notes</label>
      <input type="text" id="notes" placeholder="Notes">
    </div>
    <div class="form-group text-right">  
      <input type="submit">
    </div>
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
}

function appointmentsLoad() {
  event.preventDefault()
  fetch(APPOINTMENT_BASE_URL)
  .then(resp => resp.json())
  .then(apts => {
    for (appointment in apts.data) {
      let dataArray = apts.data[appointment].attributes
      let formattedDateTime = dataArray.appointment_date.split('T')
      let time
      formattedDateTime[1].slice(0,2) > 12 ? time = "PM" : time = "AM"
      let newDateTime = formattedDateTime[0] + ' @ ' + formattedDateTime[1].slice(0,5) + time
      let newAppointment = new Appointment(dataArray.doctor_name, newDateTime, dataArray.location, dataArray.appointment_information)
      appointmentHandle(newAppointment)
    }
  })
}

function appointmentHandle(appointmentObject) {
  let ul = document.createElement('ul')
  ul.classList.add('appointment-card')
  for (let attribute in appointmentObject) {
    let li = document.createElement('li')
    li.classList.add('appointment-attribute')
    let attributeStringSplit = attribute.match(/[A-Z]+[^A-Z]*|[^A-Z]+/g)
    li.innerHTML = `<p>${attributeStringSplit.join(" ").toUpperCase()}: ${appointmentObject[attribute]}</p>`
    ul.appendChild(li)
  }
  ul.innerHTML += `<br>`
  document.getElementById('appointments').append(ul)
}
