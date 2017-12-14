Rails.application.routes.draw do
  devise_for :users, path_names: {sign_in: 'login', sign_out: 'logout', sign_up: 'signup', password: 'forgot', confirmation: 'confirmation', unlock: 'unlock'}
  as :user do
    get 'login', to: 'devise/sessions#new'
    get 'signup', to: 'devise/registrations#new'
    get 'forgot', to: 'devise/passwords#new'
    get 'confirmation', to: 'devise/confirmations#new'
  end
  root 'static_pages#home'
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
