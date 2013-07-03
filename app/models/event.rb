class Event < ActiveRecord::Base
  attr_accessible :description, :title,
    :start_date, :end_date, 
    :start_time, :end_time,
    :user_id, :recurring

  belongs_to :user
  
end
