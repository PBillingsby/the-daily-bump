class NamesController < ApplicationController
  def create
    name = Name.create(baby_id: 1, name: params[:name])
    render json: name
  end
end
