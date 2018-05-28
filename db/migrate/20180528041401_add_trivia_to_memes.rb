class AddTriviaToMemes < ActiveRecord::Migration[5.1]
  def change
    add_column :memes, :trivia, :json
  end
end
