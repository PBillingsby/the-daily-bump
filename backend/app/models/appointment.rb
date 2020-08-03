class Appointment < ActiveRecord::Base
  belongs_to :baby
  before_create :past_appointments
  def past_appointments
    self.appointment_date > Date.today ? self.past_appointment = false : self.past_appointment = true
  end
end