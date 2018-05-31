Rails.application.routes.draw do
  root 'static_pages#home'
  get 'pagination', to: 'static_pages#pagination'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
