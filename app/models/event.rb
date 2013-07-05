class Event < ActiveRecord::Base
  validate :ensure_end_date_is_after_start_date
  
  attr_accessible :description, :title,
    :start_date, :end_date, 
    :calendar_id, :recurring

  belongs_to :calendar

  validates :description, :title,
    :start_date, :end_date,
    :recurring, :presence => true
    
  private
  
  def ensure_end_date_is_after_start_date
    if end_date - start_date == 0
      errors[:same_time] << "Start date cannot be the same as end time."
    elsif end_date - start_date < 0
      errors[:same_time] << "End date cannot be before start date."
    end
  end

end
