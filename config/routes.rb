Rails.application.routes.draw do
  resources :users
  root to: 'site#index'
  post '/wavenumber_calculation', to: 'calculations#wavenumber_calculation'
  get '/users', to: 'users#index'
end
