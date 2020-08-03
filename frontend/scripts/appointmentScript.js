const APPOINTMENT_BASE_URL = 'http://localhost:3000/appointments/'

class Appointment {
  constructor(id, doctorName, appointmentDate, appointmentLocation, appointmentNotes) {
    this.id = id,
    this.doctorName = doctorName,
    this.appointmentDate = appointmentDate,
    this.appointmentLocation = appointmentLocation,
    this.appointmentNotes = appointmentNotes
  }

  appointmentHandle() { 
    let ul = document.createElement('ul')
    ul.classList.add('list-group', 'list-group-horizontal')
    for (let attribute in this) {
      let li = document.createElement('li')
      li.classList.add('appointment-attribute', 'list-group-item')
      let attributeStringSplit = attribute.match(/[A-Z]+[^A-Z]*|[^A-Z]+/g)
      if (attribute !== 'id') {
        li.innerHTML = `<strong>${attributeStringSplit.join(" ").toUpperCase()}:</strong> ${this[attribute]}`
      }
      else {
        li.innerHTML += `<a href="#" onclick="deleteAppointment(${this.id})" class="text-center">Delete</a><br>`
      }
      ul.appendChild(li)
    }
    document.getElementById('content-results').append(ul)
  }

  static appointmentFormLoad() {
    Appointment.clearAppointmentDiv()
    document.getElementById('content-results').innerHTML = appointmentFormHtml
  }
  static handleAppointment() {
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
    .then(resp => resp.json()
    .then(appointmentObject => {
      appointmentObject.appointmentHandle()
    }))
  }
  static appointmentsLoad() {
    debugger

    let searchQuery = new URLSearchParams({query: event.target.innerText})
    Appointment.clearAppointmentDiv()

    fetch('http://localhost:3000/appointments?' + searchQuery)
    .then(resp => resp.json())
    .then(apts => {
      if (apts.error) {
        document.getElementById('content-results').innerHTML = `<h5>${apts.error}</h5>`
      }
      else {
        for (let appointment in apts.data) {
          let dataArray = apts.data[appointment].attributes
          let formattedDateTime = dataArray.appointment_date.split('T')
          let time
          formattedDateTime[1].slice(0,2) > 12 ? time = "PM" : time = "AM"
          const appointmentStatus = dataArray.pastAppointment ? "Appointment Done" : "Upcoming"
          let newDateTime = new Date(formattedDateTime[0]).toLocaleDateString() + ' @ ' + formattedDateTime[1].slice(0,5) + time
          
          let newAppointment = new Appointment(dataArray.id, dataArray.doctor_name, newDateTime, dataArray.location, dataArray.appointment_information, appointmentStatus)
          newAppointment.appointmentHandle()
        }
      }
    })
  }
  static clearAppointmentDiv() {
    document.getElementById('content-results').innerHTML = ""
  }
}

function deleteAppointment(appointmentId) {
  event.preventDefault()
  fetch(APPOINTMENT_BASE_URL + appointmentId, {
    method: 'DELETE'})
    .then(resp => Appointment.appointmentsLoad()
  )}

  const appointmentFormHtml = `<form id="appointmentForm" class="mx-auto" onsubmit="Appointment.handleAppointment()">
  <div class="row">
    <div class="form-group">
      <label class="float-left">Doctor Name</label>
      <input type="text" class="form-control" name="doctor-name" id="doctor-name" placeholder="Doctor Name">
    </div>
  </div>  
  <div class="row">
    <div class="form-group">
      <label class="float-left">Appointment Date</label>
      <input type="datetime-local" class="form-control" name="appointment-date" id="appointment-date" placeholder="Date">
    </div>
  </div>    
  <div class="row">
    <div class="form-group">   
      <label class="float-left">Location</label>
      <input type="text" name="loction" class="form-control" id="location" placeholder="Location">
    </div>
  </div>
  <div class="row">
    <div class="form-group">  
      <label class="float-left">Additional Notes</label>
      <input type="text" id="notes" class="form-control" placeholder="Notes">
    </div>
  </div>
  <div class="row">
    <div class="form-group"> 
      <input type="submit" class="float-left">
    </div>
  </div>
</form>`