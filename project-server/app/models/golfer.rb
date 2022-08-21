class Golfer < ActiveRecord::Base
  belongs_to :classification
  has_many :discs
  has_many :types, through: :discs
  has_many :manufacturers, through: :discs
end