class CreateAppointments < ActiveRecord::Migration[6.0]
  def change
    create_table :appointments do |t|
      t.belongs_to :baby
      t.datetime :appointment_date
      t.string :doctor_name
      t.string :location
      t.text :appointment_information
      t.boolean :past_appointment
    end
  end
end
