class AddUserAndRemarksToObservations < ActiveRecord::Migration[7.1]
  def change
    add_column :observations, :user, :string
    add_column :observations, :remarks, :string
  end
end
