Cal::Application.routes.draw do
  root :to => "root#root"

  resources :events
  resource :session, :only => [:create, :destroy, :new]
  resources :users, :only => [:create, :new]


end