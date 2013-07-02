class CreateRecurringEvents < ActiveRecord::Migration
  def change
    create_table :recurring_events do |t|

      t.timestamps
    end
  end
end
