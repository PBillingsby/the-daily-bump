class AppointmentsController < ApplicationController
  def create
    byebug
  end

  def appointments_params
    params.require(:appointment).permit(:doctor_name, :appointment_date, :location, :notes)
  end
end