Rails.application.routes.draw do
  resources :babies, only: [:create, :show]
  resources :appointments, only: [:create, :show, :index, :destroy]
  resources :names, only: [:create, :index, :show]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
