class CreateBabies < ActiveRecord::Migration[6.0]
  def change
    create_table :babies do |t|
      t.date :due_date
      t.string :mother
      t.string :father
    end
  end
end
