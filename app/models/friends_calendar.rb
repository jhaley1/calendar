class FriendsCalendar < ActiveRecord::Base
  attr_accessible :friend_id, :shared_calendar_id
  
  belongs_to :shared_calendar, :class_name => "Calendar"
  belongs_to :friend, :class_name => "User"
  
end
