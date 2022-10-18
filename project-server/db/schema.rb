# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_08_21_195428) do

  create_table "discs", force: :cascade do |t|
    t.string "name"
    t.string "disc_type"
    t.string "plastic"
    t.integer "weight_in_g"
    t.integer "speed"
    t.integer "glide"
    t.float "turn"
    t.float "fade"
    t.integer "manufacturer_id"
    t.integer "golfer_id"
  end

  create_table "golfers", force: :cascade do |t|
    t.string "name"
    t.string "location"
    t.integer "age"
    t.integer "pdga_number"
    t.integer "current_rating"
    t.boolean "sponsored"
    t.string "classification"
  end

  create_table "manufacturers", force: :cascade do |t|
    t.string "name"
  end

end
