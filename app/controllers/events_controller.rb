class EventsController < ApplicationController
  def create
    @event = Event.new(params[:event])
    
    if @event.save
      render :index
    else
      flash[:notice] = @event.errors.full_messages
      render :new
    end
  end
  
  def destroy
    @event = Event.find(params[:id])
    @event.destroy
    
    redirect_to calendar_url
  end
  
  def edit
    @event = Event.find(params[:id])
  end
  
  def index
    @events = current_user.events
  end
  
  def new
    @event = Event.new
  end
  
  def show
    @event = Event.find(params[:id])
  end
  
  def update
    @event = Event.find(params[:id])
    
    if @event.update_attributes
      @event.save
      render :json
    else
      flash[:notice] = @event.errors.full_messages
      render :edit
    end
  end

end
