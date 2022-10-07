class ApplicationController < Sinatra::Base
  set :default_content_type, 'application/json'
  
  # Add your routes here
  get "/" do
    { message: "Good luck with your project!" }.to_json
  end

  get "/get_seed_info" do
    {
      golfers: Golfer.all,
      classifications: Classification.all,
      types: Type.all,
      manufacturers: Manufacturer.all
    }.to_json
  end

  get "/discs" do
    Disc.all.to_json
  end

  get "/discs/:id/connections" do
    Disc.find(params[:id]).connections.to_json
  end

  get "/golfers/:id" do
    Golfer.find(params[:id]).to_json
  end

  get "/golfers/:id/owned_disc" do
    Golfer.find(params[:id]).discs.all.to_json
  end

  get "/golfers/:id/owned_amounts" do
    Golfer.find(params[:id]).type_amounts.to_json
  end

  post "/discs" do
    new_disc = Disc.create(
      name: params[:name],
      plastic: params[:plastic],
      weight_in_g: params[:weight_in_g],
      speed: params[:speed],
      glide: params[:glide],
      turn: params[:turn],
      fade: params[:fade],
      type_id: params[:type_id],
      manufacturer_id: params[:manufacturer_id],
      golfer_id: params[:golfer_id]
    )
    new_disc.to_json
  end

  delete "/discs/:id" do
    disc = Disc.find(params[:id])
    disc.destroy
    disc.to_json
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
      type_id: params[:type_id],
      manufacturer_id: params[:manufacturer_id],
      golfer_id: params[:golfer_id]
    )
    disc.to_json
  end
end