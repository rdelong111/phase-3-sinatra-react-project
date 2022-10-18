class CreateGolfers < ActiveRecord::Migration[6.1]
  def change
    create_table :golfers do |t|
      t.string :name
      t.string :location
      t.integer :age
      t.integer :pdga_number
      t.integer :current_rating
      t.boolean :sponsored
      t.string :classification
    end
  end
end
