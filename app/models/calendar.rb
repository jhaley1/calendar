class Calendar < ActiveRecord::Base
  attr_accessible :name, :user_id, :display_id, :friend_ids

  has_many :events, :dependent => :destroy
  
  has_many :friends_calendars, :foreign_key => :shared_calendar_id
  has_many :friends, :through => :friends_calendars
  
  belongs_to :user
  
  validates :name, :user_id, :display_id, :presence => true
  
end
