class ApplicationController < Sinatra::Base
  set :default_content_type, 'application/json'
  
  # Add your routes here
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

  get "/manufacturers" do
    Manufacturer.all.to_json
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