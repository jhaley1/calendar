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
    @user = User.find(params[:id])
    logout!
    
    render :new
  end
  
  def new
  end

end
