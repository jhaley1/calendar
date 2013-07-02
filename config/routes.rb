Cal::Application.routes.draw do
  root :to => "root#root"

  resources :users, :only => [:create, :new]
  resource :session, :only => [:create, :destroy, :new]
  resources :events
  resources :calendars
  

  
end