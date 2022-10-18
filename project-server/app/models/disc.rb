class Disc < ActiveRecord::Base
  belongs_to :golfer
  belongs_to :manufacturer
end