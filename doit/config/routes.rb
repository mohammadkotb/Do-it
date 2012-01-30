Doit::Application.routes.draw do
  resources :tasks
  root :to => 'home#index'
  match '/auth/:provider/callback' => 'sessions#create'

end
