class BabiesController < ApplicationController
  before_action :calculate_days_until_due, only: [:show, :create]
  
  def create
    baby = Baby.create(babies_params)
    baby.days_until_due = params[:days_until_due]
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

  def update
    baby = Baby.find_by(id: 1)
    baby.images.attach(params[:image])
    render json: baby
  end

  def babies_params
    params.require(:baby).permit(:due_date, :mother, :father, :days_until_due)
  end

  private
  def calculate_days_until_due
    baby = Baby.find_by(id: params[:id])
    if !!baby
      baby.update(days_until_due: Date.parse(baby.due_date.to_s).mjd - Date.parse(Date.today.to_s).mjd)
    else
      params[:days_until_due] = Date.parse(params[:due_date].to_s).mjd - Date.parse(Date.today.to_s).mjd
    end
  end
  
end