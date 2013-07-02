class SessionsController < ApplicationController
  def create
    @user = User.new(params[:user])
    if @user.save
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
    @user = User.new
  end

end
