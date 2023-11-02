class Observations < ActiveRecord::Migration[7.1]
  def change
    create_table :observations do |t|
      t.date :date
      t.integer :count
      t.integer :Loc
      t.integer :Lat
      t.timestamps
    end
  end
end
