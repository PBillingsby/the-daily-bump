class AppointmentsController < ApplicationController
  def create
    appointment = Appointment.create(appointment_params)
    render json: appointment
  end

  def index
    appointments = Appointment.all
    render json: appointments
  end

  def appointment_params
    params.require(:appointment).permit(:baby_id, :doctor_name, :appointment_date, :location, :appointment_information)
  end
end