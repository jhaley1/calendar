class CreateFriendsCalendars < ActiveRecord::Migration
  def change
    create_table :friends_calendars do |t|
      t.integer :friend_id
      t.integer :shared_calendar_id

      t.timestamps
    end
  end
end
