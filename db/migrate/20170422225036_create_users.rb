class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email, unique: true
      t.string :password_digest
      t.string :remember_digest
      t.boolean :admin, default: false
      t.string :activation_digest
      t.boolean :activated, default: false
      t.datetime :activated_at
      t.string :reset_digest
      t.string :reset_sent_at
      t.string :picture

      t.timestamps
    end
    add_index :users, :name
    add_index :users, :email
  end
end
