class RecurringsController < ApplicationController
  def create
    params[:event][:num_of_times].times do
      start_date = next_date(params[:start_date])
      end_date = next_date(params[:end_date])
      
      @event = Event.new({ 
        calendar_id: params[:event][:calendar_id],
        title: params[:event][:title],
        description: params[:event][:description],
        start_date: new_start_date,
        end_date: new_end_date
        })
        
      if @event.save
        render :json => @event
      else
        flash[:notice] = @event.errors.full_messages
        render :json => @event.errors.full_messages, :status => 422
      end
    end
  end
  
  def destroy
    
  end
  
  private
  
  def next_date(date)
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
