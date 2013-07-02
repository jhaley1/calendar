Cal::Application.routes.draw do
  root :to => "root#root"

  resources :users, :only => [:create, :new]
  resources :session, :only => [:create, :destroy, :new]
  resources :events
  

  
end