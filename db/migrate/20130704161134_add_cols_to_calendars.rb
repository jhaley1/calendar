class AddColsToCalendars < ActiveRecord::Migration
  def change
    add_column :calendars, :user_id, :integer
    add_column :calendars, :name, :string
  end
end
