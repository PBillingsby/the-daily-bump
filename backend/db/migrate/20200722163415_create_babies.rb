class CreateBabies < ActiveRecord::Migration[6.0]
  def change
    create_table :babies do |t|
      t.date :due_date
      t.string :mother
      t.string :father
      t.integer :days_until_date
      t.integer :weeks_until_date
    end
  end
end
