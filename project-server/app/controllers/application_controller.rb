class ApplicationController < Sinatra::Base
  set :default_content_type, 'application/json'
  
  # Add your routes here
  get "/" do
    { message: "Good luck with your project!" }.to_json
  end

  get "/classifications" do
    Classification.all.to_json
  end

  get "/discs" do
    Disc.all.to_json
  end

  get "/golfers" do
    Golfer.all.to_json
  end

  get "/golfers/:id" do
    Golfer.find(params[:id]).to_json
  end

  get "/manufacturers" do
    Manufacturer.all.to_json
  end

  get "/manufacturers/:id" do
    Manufacturer.find(params[:id]).to_json
  end

  get "/types" do
    Type.all.to_json
  end

  get "/types/:id" do
    Type.find(params[:id]).to_json
  end
end
