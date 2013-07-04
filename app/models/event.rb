class Event < ActiveRecord::Base
  attr_accessible :description, :title,
    :start_date, :end_date, 
    :start_time, :end_time,
    :calendar_id, :recurring

  belongs_to :calendar

end
