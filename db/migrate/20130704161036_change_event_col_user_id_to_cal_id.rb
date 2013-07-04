class ChangeEventColUserIdToCalId < ActiveRecord::Migration
  def change
    remove_column :events, :user_id
    add_column :events, :calendar_id, :integer
  end
end
