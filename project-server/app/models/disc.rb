class Disc < ActiveRecord::Base
  belongs_to :golfer
  belongs_to :type
  belongs_to :manufacturer

  def connections
    {
      current_type: self.type.name,
      current_manu: self.manufacturer.name,
      current_owner: self.golfer.name
    }
  end
end