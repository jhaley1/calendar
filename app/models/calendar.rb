class Calendar < ActiveRecord::Base
  attr_accessible :name, :user_id, :display_id

  has_many :events, :dependent => :destroy
  belongs_to :user
  
  validates :name, :user_id, :display_id, :presence => true
  
end
