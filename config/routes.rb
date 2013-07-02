Cal::Application.routes.draw do
  resources :users, :only => [:create, :new]
  resources :session
  
  root :to => "root#root"
end