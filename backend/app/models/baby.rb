class Baby < ActiveRecord::Base
  before_save :format_date, :calculate_dates


  def calculate_dates
    baby_due_date = Date.parse(self.due_date.strftime("%m/%d/%Y")).mjd
    date_now = Date.parse(Date.today.to_date.to_s).mjd
  end

  def format_date
    self.due_date = self.due_date.strftime("%m/%d/%Y")
  end
end