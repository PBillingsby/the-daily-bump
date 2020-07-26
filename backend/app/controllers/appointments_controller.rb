class AppointmentsController < ApplicationController
  def create
    appointment = Appointment.create(appointment_params)
    render json: AppointmentSerializer.new(appointment).serialized_json
  end

  def index
    appointments = Appointment.all
    render json: AppointmentSerializer.new(appointments).serialized_json
  end

  def destroy
    appointment = Appointment.find_by(id: params[:id])
    appointment.destroy
  end

  def appointment_params
    params.require(:appointment).permit(:baby_id, :doctor_name, :appointment_date, :location, :appointment_information)
  end
end