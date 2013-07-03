class EventsController < ApplicationController
  def create
    @event = Event.new(params[:event])
    
    if @event.save
      render :json => @event
    else
      flash[:notice] = @event.errors.full_messages
      render :new
    end
  end
  
  def destroy
    @event = Event.find(params[:id])
    @event.destroy
    
    render :json => nil
  end
  
  def edit
    @event = Event.find(params[:id])
    render :json => @event
  end
  
  def index
    @events = current_user.events
    render :json => @events
  end
  
  def new
    @event = Event.new
    render :json => @event
  end
  
  def show
    @event = Event.find(params[:id])
    render :json => @event
  end
  
  def update
    @event = Event.find(params[:id])
    
    if @event.update_attributes
      @event.save
      render :json => @event
    else
      flash[:notice] = @event.errors.full_messages
      render :json => @event
    end
  end

end
