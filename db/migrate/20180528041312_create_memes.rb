class CreateMemes < ActiveRecord::Migration[5.1]
  def change
    create_table :memes do |t|
      t.string :name
      t.string :image_name
      t.string :rating_name
      t.string :yt_link
      t.string :yt_title
      t.text :main_quote

      t.timestamps
    end
  end
end
