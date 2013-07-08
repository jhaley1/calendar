class AddNumOfTimesFrequencyColsToEvents < ActiveRecord::Migration
  def change
    add_column :events, :frequency, :string
    add_column :events, :num_of_times, :integer
  end
end
