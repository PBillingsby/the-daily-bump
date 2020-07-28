class NamesController < ApplicationController
  def create
    name = Name.find_or_create_by(baby_id: 1, name: params[:name])
    render json: name
  end

  def index
    names = Name.all
    if (names.count < 1)
      names = {error: "No names yet"}
    end
    render json: names
  end

  def show
    name = Name.find_by(id: params[:id])
    render json: name
  end

  def destroy
    name = Name.find_by(id: params[:id])
    name.destroy
    head :no_content
  end
end
