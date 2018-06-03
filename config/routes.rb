Rails.application.routes.draw do

  get 'memes/show'
  root 'static_pages#home'
  resources :memes, only: [:show]
  post "/subscribe" => "subscriptions#create"
  post "/unsubscribe" => "subscriptions#destroy"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
