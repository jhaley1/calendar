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
    @calendars = current_user.calendars
    render :index
  end
  
  def new
    @calendar = Calendar.new
    render :json => @calendar
  end
  
  def show
    @event = current_user.calendars.basic_search(params[:search_item])
    render :json => @event
  end
  
  def update
    @calendar = Calendar.find(params[:id])
    
    if @calendar.update_attributes(params[:event])
      @calendar.save
      render :json => @calendar
    else
      flash[:notice] = @calendar.errors.full_messages
      render :json => @calendar
    end
  end

end
