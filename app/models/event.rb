class Event < ActiveRecord::Base
  attr_accessible :description, :recurring, :datetime

  belongs_to :recurring_events
  
#  def datetime=(date/time)
  
end
