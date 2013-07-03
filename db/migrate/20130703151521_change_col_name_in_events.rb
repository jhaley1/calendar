class ChangeColNameInEvents < ActiveRecord::Migration
  def change
    remove_column :events, :creator_id
    add_column :events, :user_id, :integer
  end
end
