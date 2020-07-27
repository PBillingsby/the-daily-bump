class NamesController < ApplicationController
  def create
    name = Name.create(baby_id: 1, name: params[:name])
    byebug
    render json: name
  end

  def index
    names = Name.all
    render json: names
  end
end
