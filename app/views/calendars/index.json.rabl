collection @calendars
attributes :id, :name, :user_id, :display_id, :friends
child :events do
  attributes :description, :title,
    :start_date, :end_date, 
    :start_time, :end_time,
    :calendar_id, :recurring,
    :id
end