class RootController < ApplicationController
  before_filter :authorize!
  
  def index
  end
  
  private
  
  def authorize!
    unless logged_in?
      redirect_to new_session_url
    end
  end

end
