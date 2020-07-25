class Baby < ActiveRecord::Base
  has_many :appointments
  validates :due_date, presence: true
  validates :mother, presence: true
  validates :father, presence: true

end