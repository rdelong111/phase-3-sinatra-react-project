class ApplicationController < Sinatra::Base
  set :default_content_type, 'application/json'
  
  # Add your routes here
  # testing
  get "/" do
    { message: "Good luck with your project!" }.to_json
  end

  get "/golfers" do
    Golfer.all.to_json(:include => {:discs => {
      :include => {:manufacturer => {
        :only => [:name]
      }}
    }}, :methods => :type_amounts)
  end

  post "/golfers" do
    golfer = Golfer.create(
      name: params[:name],
      location: "#{params[:city]}, #{params[:state]}",
      age: params[:age],
      pdga_number: params[:pdga_number],
      current_rating: params[:current_rating],
      sponsored: params[:sponsored],
      classification: params[:classification]
    )
    golfer.to_json(:include => {:discs => {
      :include => {:manufacturer => {
        :only => [:name]
      }}
    }}, :methods => :type_amounts)
  end

  get "/manufacturers" do
    Manufacturer.all.to_json
  end

  post "/manufacturers" do
    manufacturer = Manufacturer.create(name: params[:name])
    manufacturer.to_json
  end

  post "/golfers/:id/discs" do
    golfer = Golfer.find(params[:id])
    disc = golfer.discs.create(
      name: params[:name],
      plastic: params[:plastic],
      weight_in_g: params[:weight_in_g],
      speed: params[:speed],
      glide: params[:glide],
      turn: params[:turn],
      fade: params[:fade],
      disc_type: params[:disc_type]
    )
    Manufacturer.find(params[:manufacturer_id]).discs << disc
    disc.to_json(:include => {:manufacturer => {:only => [:name]}})
  end

  patch "/discs/:id" do
    disc = Disc.find(params[:id])
    disc.update(
      name: params[:name],
      plastic: params[:plastic],
      weight_in_g: params[:weight_in_g],
      speed: params[:speed],
      glide: params[:glide],
      turn: params[:turn],
      fade: params[:fade],
      disc_type: params[:disc_type],
      manufacturer_id: params[:manufacturer_id]
    )
    disc.to_json(:include => {:manufacturer => {:only => [:name]}})
  end

  delete "/discs/:id" do
    disc = Disc.find(params[:id])
    disc.destroy
    disc.to_json
  end
end