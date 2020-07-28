class BabiesController < ApplicationController
  before_action :calculate_days_until_due, only: [:show]
  
  def create
    baby = Baby.create(babies_params)
    render json: baby
  end

  def show
    baby = Baby.find_by(id: params[:id])
    if baby
      render json: baby
    else
      render json: {error: 'No Baby Yet'}
    end
  end

  def babies_params
    params.require(:baby).permit(:due_date, :mother, :father, :days_until_due, images: [])
  end

  private
  def calculate_days_until_due
    baby = Baby.find_by(id: params[:id])
    if baby
      baby.update(days_until_due: Date.parse(baby.due_date.to_s).mjd - Date.parse(Date.today.to_s).mjd)
    end
  end
  
end