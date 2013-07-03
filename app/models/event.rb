class Event < ActiveRecord::Base
  attr_accessible :description, :recurring, 
    :start_date, :end_date, 
    :start_time, :end_time,
    :creator_id

  belongs_to :creator, :class_name => "User"
  
end
