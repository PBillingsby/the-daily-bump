class ApplicationController < ActionController::API
  before_action :calculate_dates, only: [:create, :show]

  def calculate_dates
    baby = Baby.find_by(id: params[:id])
    if baby
      baby_due_date = Date.parse(baby.due_date.strftime("%m/%d/%Y")).mjd
      date_now = Date.parse(Date.today.to_date.to_s).mjd
      byebug
      baby.days_until_date = baby_due_date - date_now
      baby.weeks_until_date = baby.days_until_date / 7
    end
  end

end
