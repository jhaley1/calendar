Cal::Application.routes.draw do
  root :to => "root#root"
  
  resources :calendars do
    resources :events, :only => [:edit]
  end

  resources :days, :only => [:index]
  resources :events
  resource :session, :only => [:create, :destroy, :new]
  resources :users, :only => [:create, :new]
  resources :weeks, :only => [:index]

end