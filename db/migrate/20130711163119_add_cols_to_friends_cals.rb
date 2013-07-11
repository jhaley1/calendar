class AddColsToFriendsCals < ActiveRecord::Migration
  def change
    add_column :friends_calendars, :friend_id, :integer
    add_column :friends_calendars, :shared_calendar_id, :integer
  end

end
