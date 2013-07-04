class Calendar < ActiveRecord::Base
  attr_accessible :name, :user_id

  has_many :events
  belongs_to :user
  
  validates :name, :user_id, :presence => true
  
end
