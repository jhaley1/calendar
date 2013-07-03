class Event < ActiveRecord::Base
  attr_accessible :description, :title,
    :start_date, :end_date, 
    :start_time, :end_time,
    :user_id, :recurring

  belongs_to :user

  # def start_date_info=(start_date)
  #   start_date_info = Time.parse(start_date_info)
  #   temp = start_date_info.strftime("%B %d %Y %l %M %p")
  # 
  #   this.start_date = temp.split(' ')
  # end
end
