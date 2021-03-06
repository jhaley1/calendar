class EventsController < ApplicationController
  def create
    @calendar = Calendar.find(params[:event][:calendar_id])
    @event = @calendar.events.build(params[:event])
    @events = [@event]
    
    if @event.save
      if params[:event][:recurring]
        create_recurring_events
      end
      
      if params[:event][:reminder]
        total_mins = send_at(params[:event][:start_date])
        ReminderMailer
          .delay({ :run_at => total_mins.from_now })
          .reminder(current_user, @event)
      end
      
      render :json => @events
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

  private
  
  def create_recurring_events
    params[:event][:num_of_times].to_i.times do
      params[:event][:start_date] = next_date(params[:event][:start_date])
      params[:event][:end_date] = next_date(params[:event][:end_date])
      
      event = Event.create!({ 
        calendar_id: params[:event][:calendar_id],
        title: params[:event][:title],
        description: params[:event][:description],
        start_date: params[:event][:start_date],
        end_date: params[:event][:end_date],
        reminder: params[:event][:reminder]
        })
        
      @events << event
    end
  end

  def next_date(date)
    date = DateTime.parse(date)
    
    case params[:event][:frequency]
    when "daily"
      (date + 1.days).rfc3339
    when "weekly"
      (date + 1.weeks).rfc3339
    when "biweekly"
      (date + 2.weeks).rfc3339
    when "monthly"
      (date + 1.months).rfc3339
    when "yearly"
      (date + 1.years).rfc3339
    end
  end

  def send_at(date)
    time = DateTime.parse(date)
    minutes = distance_between(DateTime.now, time)
  end
  
  def distance_between(current_date, start_date)
    difference = start_date - current_date
    (difference.to_i * 24 * 60 * 60) - 60.minutes
  end
    
end
