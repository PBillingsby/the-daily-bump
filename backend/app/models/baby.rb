class Baby < ActiveRecord::Base
  before_save :format_date
  has_many :appointments


  def format_date
    self.due_date = self.due_date.strftime("%m/%d/%Y")
  end
end