class ChangeColNameInRecurring < ActiveRecord::Migration
  def change
    remove_column :recurrings, :end_time
    add_column :recurrings, :end_date, :datetime
  end
end
