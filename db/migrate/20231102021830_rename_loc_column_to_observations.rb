class RenameLocColumnToObservations < ActiveRecord::Migration[7.1]
  def change
    rename_column :observations, :Loc, :Long
  end
end
