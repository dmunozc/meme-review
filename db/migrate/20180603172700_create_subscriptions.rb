class CreateSubscriptions < ActiveRecord::Migration[5.1]
  def change
    create_table :subscriptions do |t|
      t.text :endpoint
      t.text :p256dh
      t.text :auth

      t.timestamps
    end
  end
end
