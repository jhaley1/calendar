class SessionsController < ApplicationController
  def create
    @user = User.find_by_email(params[:user][:email])
 
    if @user && @user.correct_password?(params[:user][:password])
      login!(@user)
      redirect_to root_url
    else
      render :new
    end
  end
  
  def destroy
    logout!
    
    redirect_to new_session_url
  end
  
  def new
    render :new
  end

end
