class AppointmentsController < ApplicationController
  # before_action :past_appointment, only: [:index]
  def create
    appointment = Appointment.create(appointment_params)
    render json: AppointmentSerializer.new(appointment).serialized_json
  end

  def index
    if params[:query] == "View Appointments"
      appointments = Appointment.where(past_appointment: false)
    else params[:query] == "Past Appointments"
      appointments = Appointment.where(past_appointment: true)
    end
    if Appointment.count == 0 || appointments.empty?
      render json: {error: 'No Appointments Yet'}
    else
      render json: AppointmentSerializer.new(appointments).serialized_json 
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
  # def past_appointment
  #   Appointment.all.each do |apt|
  #     apt.appointment_date < Date.today ? apt.update(past_appointment: true) : apt.update(past_appointment: false)
  #   end
  # end
end