class AddPlaceColumnToObservations < ActiveRecord::Migration[7.1]
  def change
    add_column :observations, :place, :string
  end
end
