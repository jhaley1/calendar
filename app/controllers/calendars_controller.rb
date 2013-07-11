class CalendarsController < ApplicationController
  def create
    @calendar = Calendar.new(params[:calendar])
    
    if @calendar.save
      render :json => @calendar
    else
      flash[:notice] = @calendar.errors.full_messages
      render :json => @calendar.errors.full_messages, :status => 422
    end
  end
  
  def destroy
    @calendar = Calendar.find(params[:id])
    @calendar.destroy
    
    render :json => nil
  end
  
  def edit
    @calendar = Calendar.find(params[:id])
    
    render :json => @calendar
  end
  
  def index
    if current_user.shared_calendars
      @calendars = current_user.calendars + current_user.shared_calendars
    else
      @calendars = current_user.calendars
    end
    
    @users = User.find(:all, :conditions => ["id != ?", current_user.id])
    
    render :index
  end
  
  def new
    @calendar = Calendar.new
    render :json => @calendar
  end
  
  def update
    @calendar = Calendar.find(params[:id])
    
    if @calendar.update_attributes(params[:calendar])
      @calendar.save
      render :json => @calendar
    else
      flash[:notice] = @calendar.errors.full_messages
      render :json => @calendar
    end
  end

end
