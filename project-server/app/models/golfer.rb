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

  def statement
    rating = self.classification.name
    grammer_rating = if rating == "Pro"
      "a #{rating}"
    elsif rating == "Amateur"
      "an #{rating}"
    else
      "not classed"
    end

    "
      #{self.name} is #{grammer_rating} and is #{self.age} years old from #{self.location}.
      #{self.name}'s rating is #{self.current_rating}.
      #{self.name}'s bag has #{self.discs.all.length} discs
      which include #{self.type_amounts[:Driver]} drivers,
      #{self.type_amounts[:Fairway]} fairways, #{self.type_amounts[:Midrange]} midranges,
      and #{self.type_amounts[:Putter]} putters.
    "
  end
end