Rails.application.routes.draw do
  resources :babies, only: [:create, :show, :index, :update, :destroy]
  resources :appointments, only: [:create, :show, :index, :destroy]
  resources :names, only: [:create, :index, :show, :destroy]
  get '/babies/:id/images', to: 'babies#images'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
