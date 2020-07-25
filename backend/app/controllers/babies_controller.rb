class BabiesController < ApplicationController
  def create
    params[:due_date] = params[:due_date].split("-").reverse.join("/")
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
    params.require(:baby).permit(:due_date, :mother, :father)
  end
  
end