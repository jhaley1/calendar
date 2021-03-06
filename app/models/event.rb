class Event < ActiveRecord::Base
  attr_accessible :description, :title,
    :start_date, :end_date, 
    :calendar_id, :recurring,
    :num_of_times, :frequency,
    :reminder

  before_save :default_values

  belongs_to :calendar

  validate :ensure_end_date_is_after_start_date
  
  validates :title, :start_date, :end_date, :presence => true
    
  private
  
  def default_values
    unless self.recurring
      self.recurring = false
    end
    
    if self.num_of_times == ""
      self.num_of_times = 0
    end
    
    if self.frequency == ""
      self.frequency = ""
    end
  end
  
  def ensure_end_date_is_after_start_date
    if (self.end_date || self.start_date) == nil
      errors[:time] << "-d must enter both start and end dates."
    elsif self.end_date - self.start_date == 0
      errors[:same_time] << "- start date cannot be the same as end time."
    elsif self.end_date - self.start_date < 0
      errors[:same_time] << "- end date cannot be before start date."
    end
  end

end
