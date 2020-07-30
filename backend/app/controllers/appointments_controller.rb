class AppointmentsController < ApplicationController
  before_action :past_appointment, only: [:create, :index]
  def create
    appointment = Appointment.create(appointment_params)
    render json: AppointmentSerializer.new(appointment).serialized_json
  end

  def index
    appointments = Appointment.all
    if appointments.count > 0
      render json: AppointmentSerializer.new(appointments).serialized_json
    else
      render json: {error: 'No Appointments Yet'}
    end
  end

  def destroy
    appointment = Appointment.find_by(id: params[:id])
    appointment.destroy
  end

  def appointment_params
    params.require(:appointment).permit(:baby_id, :doctor_name, :appointment_date, :location, :appointment_information)
  end

  private
  def past_appointment
    Baby.first.appointments.each do |apt|
      apt.appointment_date < Date.today ? apt.past_appointment = true : apt.past_appointment = false
    end
  end
end