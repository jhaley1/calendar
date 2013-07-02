class Event < ActiveRecord::Base
  attr_accessible :description, :recurring, :time, :title

  belongs_to :day
  belongs_to :recurring_events
  
end
