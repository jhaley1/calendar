Cal::Application.routes.draw do
  root :to => "root#root"
  
  resources :calendars do
    resources :events, :only => [:create, :index, :new]
  end
  
  resources :events
  resource :session, :only => [:create, :destroy, :new]
  resources :users, :only => [:create, :new]

end