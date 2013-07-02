class Event < ActiveRecord::Base
  attr_accessible :description, :recurring, 
    :start_date, :end_date, 
    :start_time, :end_time

  belongs_to :recurring_events
  
end
