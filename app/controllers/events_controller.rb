class EventsController < ApplicationController
  def create
    @calendar = Calendar.find(params[:event][:calendar_id])
    @event = @calendar.events.build(params[:event])
    
    if @event.save
      render :json => @event
    else
      flash[:notice] = @event.errors.full_messages
      render :json => @event.errors.full_messages, :status => 422
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
    
    if @event.update_attributes(params[:event])
      @event.save
      render :json => @event
    else
      flash[:notice] = @event.errors.full_messages
      render :json => @event.errors.full_messages, :status => 422
    end
  end

end
