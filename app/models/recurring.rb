class Recurring < ActiveRecord::Base
  attr_accessible :calendar_id, :description, :end_date, :start_date, :title

  def create_recurring_events
    params[:event][:num_of_times].to_i.times do
      start_date = next_date(params[:start_date])
      end_date = next_date(params[:end_date])
      
      @event = Event.new({ 
        calendar_id: params[:event][:calendar_id],
        title: params[:event][:title],
        description: params[:event][:description],
        start_date: start_date,
        end_date: end_date
        })

      if @event.save
        render :json => @event
      else
        flash[:notice] = @event.errors.full_messages
        render :json => @event.errors.full_messages, :status => 422
      end
    end
  end
  
  private
  
  def next_date(date)
    debugger
    
    case params[:frequency]
    when "daily"
      date + 1.days
    when "weekly"
      date + 1.weeks
    when "biweekly"
      date + 2.weeks
    when "monthly"
      date + 1.months
    when "yearly"
      date + 1.years
    end
  end
end
