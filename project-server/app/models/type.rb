class Type < ActiveRecord::Base
  has_many :discs
  has_many :golfers, through: :discs
end