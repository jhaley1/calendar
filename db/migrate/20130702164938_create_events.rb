class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :title
      t.text :description
      t.string :time
      t.boolean :recurring

      t.timestamps
    end
  end
end
