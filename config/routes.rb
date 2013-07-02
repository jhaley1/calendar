Cal::Application.routes.draw do
  resources :users, :only => [:create, :new]
  resources :session, :only => [:create, :destroy, :new]
  
  root :to => "root#root"
  
end