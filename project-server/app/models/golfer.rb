class Golfer < ActiveRecord::Base
  belongs_to :classification
  has_many :discs
  has_many :types, through: :discs
  has_many :manufacturers, through: :discs

  def type_amounts
    {
      Driver: self.types.where(name: "Driver").length,
      Fairway: self.types.where(name: "Fairway").length,
      Midrange: self.types.where(name: "Midrange").length,
      Putter: self.types.where(name: "Putter").length
    }
  end
end