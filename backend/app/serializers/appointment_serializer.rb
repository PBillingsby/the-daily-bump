class AppointmentSerializer
  include FastJsonapi::ObjectSerializer
  attributes :doctor_name, :appointment_date, :location, :appointment_information, :id
end
