class CreateDiscs < ActiveRecord::Migration[6.1]
  def change
    create_table :discs do |t|
      t.string :name
      t.string :plastic
      t.integer :weight_in_g
      t.integer :speed
      t.integer :glide
      t.float :turn
      t.float :fade
      t.integer :type_id
      t.integer :manufacturer_id
      t.integer :golfer_id
    end
  end
end
