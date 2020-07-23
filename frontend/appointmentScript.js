const BASEURL = 'http://localhost:3000/'

// WHEN ADD APPOINTMENT CLICKED, APPOINTMENT FORM APPENDED TO #appointment-form DIV
function appointmentLoad() {
  document.getElementById('appointment-form').innerHTML = `
  <form class="p-2" onsubmit="handleAppointment()">
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
    <div class="form-group">
      <label>Additional Notes</label>
      <textarea id="notes" placeholder="Notes"></textarea>
    </div>
    <input type="submit">
  </form>`
}

function handleAppointment() {
  const appointment = {
    doctorName: document.getElementById('doctor-name').value,
    appointmentDate: document.getElementById('appointment-date').value,
    location: document.getElementById('location').value,
    notes: document.getElementById('notes').value
  }
  fetch(BASEURL + 'appointments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(appointment)
  })
  .then(resp => resp.json())
  .then(appointmentObj => {
    debugger
  })
}
