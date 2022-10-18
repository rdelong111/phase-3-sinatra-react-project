class Golfer < ActiveRecord::Base
  has_many :discs
  has_many :manufacturers, through: :discs

  def type_amounts
    {
      Driver: self.discs.where(disc_type: "Driver").length,
      Fairway: self.discs.where(disc_type: "Fairway").length,
      Midrange: self.discs.where(disc_type: "Midrange").length,
      Putter: self.discs.where(disc_type: "Putter").length
    }
  end

  def test_method
    "test"
  end
end