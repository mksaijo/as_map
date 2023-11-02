class CreateObservations < ActiveRecord::Migration[7.1]
  def change
    create_table :observations do |t|
      t.date :date
      t.integer :count
      t.float :long
      t.float :lat
      t.timestamps
    end
  end  
end
