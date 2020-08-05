class CreateNames < ActiveRecord::Migration[6.0]
  def change
    create_table :names do |t|
      t.belongs_to :baby
      t.string :name
      t.text :meaning
      t.string :usage
      t.string :definition
    end
  end
end
