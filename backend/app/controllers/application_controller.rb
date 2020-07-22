class ApplicationController < ActionController::API
  before_action :calculate_dates, only: [:create, :show]
  def calculate_dates
    baby = Baby.find_by(id: params[:id])
    if baby
      format_baby_due_date = Date.parse(baby.due_date.strftime("%m/%d/%Y")).mjd
      baby.update(days_until_date: format_baby_due_date - Date.parse(Date.today.to_date.to_s).mjd)
      baby.update(weeks_until_date: baby.days_until_date / 7)
    end
  end
end
