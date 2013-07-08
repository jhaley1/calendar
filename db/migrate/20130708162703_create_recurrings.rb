class CreateRecurrings < ActiveRecord::Migration
  def change
    create_table :recurrings do |t|
      t.string :title
      t.text :description
      t.integer :calendar_id
      t.datetime :start_date
      t.datetime :end_time

      t.timestamps
    end
  end
end
