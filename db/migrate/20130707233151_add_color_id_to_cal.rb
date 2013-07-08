class AddColorIdToCal < ActiveRecord::Migration
  def change
    add_column :calendars, :display_id, :integer
  end
end
