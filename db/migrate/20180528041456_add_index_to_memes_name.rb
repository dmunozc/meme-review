class AddIndexToMemesName < ActiveRecord::Migration[5.1]
  def change
    add_index :memes, :name, unique: true
  end
end
