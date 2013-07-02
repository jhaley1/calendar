class UsersController < ApplicationController
  def create
    @user = User.new(params[:user])
      
    if @user.save
      login!(@user)
      redirect_to root_url
    else
      flash[:notice] = @user.errors.full_messages
      render :new
    end
  end
  
  def new
    @user = User.new
  end

end
