class Baby < ActiveRecord::Base
  before_save :format_date
  has_many :appointments
  validates :mother, presence: true
  validates :father, presence: true

  def format_date
    self.due_date = self.due_date.strftime("%m/%d/%Y")
  end
end