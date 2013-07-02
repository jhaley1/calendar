class StartEndDatesAndTimes < ActiveRecord::Migration
  def change
    remove_column :events, :time
    
    add_column :events, :start_date, :string
    add_column :events, :end_date, :string
    add_column :events, :start_time, :string
    add_column :events, :end_time, :string
  end
end
