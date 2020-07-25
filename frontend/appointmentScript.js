const APPOINTMENT_BASE_URL = 'http://localhost:3000/appointments'
const appointments = []

class Appointment {
  constructor(doctorName, appointmentDate, appointmentLocation, appointmentNotes) {
    this.doctorName = doctorName,
    this.appointmentDate = appointmentDate,
    this.appointmentLocation = appointmentLocation,
    this.appointmentNotes = appointmentNotes
  }
}

// WHEN ADD APPOINTMENT CLICKED, APPOINTMENT FORM APPENDED TO #appointment-form DIV
function appointmentFormLoad() {
  document.getElementById('appointment-form').innerHTML = `
  <form id="appointmentForm" class="p-2 text-right" onsubmit="handleAppointment()">
    <div class="form-group">
      <label>Doctor Name</label>
      <input type="text" name="doctor-name" id="doctor-name" placeholder="Doctor Name">
    </div>
    <div class="form-group">
      <label>Appointment Date</label>
      <input type="date" name="appointment-date" id="appointment-date" placeholder="Date">
    </div>
    <div class="form-group">
      <label>Location</label>
      <input type="text" name="loction" id="location" placeholder="Location">
    </div>
    <div class="form-group text-right">
      <label>Additional Notes</label>
      <input type="text" id="notes" placeholder="Notes">
    </div>
    <div class="form-group text-center">  
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
  .then(resp => resp.json())
  .then(apt => {
    debugger
    let appointment = new Appointment(apt.doctor_name, apt.appointment_date, apt.location, apt.appointment_information)
    appointments.push(appointment)
  })
}

function appointmentsLoad() {
  let ul = document.createElement('ul')
  appointments.forEach(apt => {
    let li = document.createElement('li')
    li.innerHTML = `<p>Date: ${apt.appointment_date} Doctor: ${apt.doctor_name} Location: ${apt.location}</p>`
    ul.appendChild(li)
  })
  document.getElementById('appointments').append(ul)
}
