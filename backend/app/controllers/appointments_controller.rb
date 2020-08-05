class AppointmentsController < ApplicationController
  def create
    appointment = Appointment.create(appointment_params)
    render json: appointment
  end

  def index
    if params[:query] == "View Upcoming Appointments"
      appointments = Appointment.where(past_appointment: false)
    else params[:query] == "Past Appointments"
      appointments = Appointment.where(past_appointment: true)
    end
    if Appointment.count == 0 || appointments.empty?
      render json: {error: 'No Appointments Yet'}
    else
      render json: appointments
    end
  end

  def destroy
    appointment = Appointment.find_by(id: params[:id])
    appointment.destroy
  end

  def appointment_params
    params.require(:appointment).permit(:baby_id, :doctor_name, :appointment_date, :location, :appointment_information)
  end
end