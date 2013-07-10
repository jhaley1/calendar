class AddReminderBooleanToEvents < ActiveRecord::Migration
  def change
    add_column :events, :reminder, :boolean, :default => false
  end
end
