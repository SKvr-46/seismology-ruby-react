Rails.application.routes.draw do
  root to: 'site#index'
  post '/wavenumber_calculation', to: 'calculations#wavenumber_calculation'
end
