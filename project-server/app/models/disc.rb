class Disc < ActiveRecord::Base
  belongs_to :golfer
  belongs_to :type
  belongs_to :manufacturer
end