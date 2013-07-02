class Calendar < ActiveRecord::Base
  has_many :days
  belongs_to :user
  
end
