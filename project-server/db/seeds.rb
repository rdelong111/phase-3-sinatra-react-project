puts "🌱 Seeding spices..."

Golfer.create(
  name: "Ryan DeLong",
  location: "Fort Walton Beach, FL",
  age: 26,
  pdga_number: 225221,
  current_rating: 0,
  sponsored: false,
  classification: "Amateur"
)
Golfer.create(
  name: "Alexis DeLong",
  location: "Fort Walton Beach, FL",
  age: 26,
  pdga_number: 0,
  current_rating: 0,
  sponsored: false,
  classification: "None"
)
Golfer.create(
  name: "Brodie Smith",
  location: "Dallas, TX",
  age: 25,
  pdga_number: 128378,
  current_rating: 1022,
  sponsored: true,
  classification: "Pro"
)

Manufacturer.create(name: "MVP")
Manufacturer.create(name: "Innova")
Manufacturer.create(name: "Latitude 64")
Manufacturer.create(name: "Westside")
Manufacturer.create(name: "Discraft")
Manufacturer.create(name: "Dynamic Discs")
Manufacturer.create(name: "Axiom")
Manufacturer.create(name: "Dismania")
Manufacturer.create(name: "Prodigy")

Disc.create(name: "Wave", disc_type: "Driver", plastic: "Fission", weight_in_g: 158, speed: 11, glide: 5, turn: -2.5, fade: 2.0, manufacturer_id: 1, golfer_id: 1)
Disc.create(name: "Mako3", disc_type: "Midrange", plastic: "Champion", weight_in_g: 176, speed: 5, glide: 5, turn: 0, fade: 0, manufacturer_id: 2, golfer_id: 1)
Disc.create(name: "Mako3", disc_type: "Midrange", plastic: "Champion", weight_in_g: 170, speed: 5, glide: 5, turn: 0, fade: 0, manufacturer_id: 2, golfer_id: 2)
Disc.create(name: "Buzzz", disc_type: "Driver", plastic: "Fission", weight_in_g: 158, speed: 11, glide: 5, turn: -2.5, fade: 2.0, manufacturer_id: 1, golfer_id: 1)
Disc.create(name: "Buzzz", disc_type: "Midrange", plastic: "Champion", weight_in_g: 176, speed: 5, glide: 5, turn: 0, fade: 0, manufacturer_id: 2, golfer_id: 1)
Disc.create(name: "Wave", disc_type: "Driver", plastic: "Fission", weight_in_g: 158, speed: 11, glide: 5, turn: -2.5, fade: 2.0, manufacturer_id: 1, golfer_id: 1)
Disc.create(name: "Mako3", disc_type: "Midrange", plastic: "Champion", weight_in_g: 176, speed: 5, glide: 5, turn: 0, fade: 0, manufacturer_id: 2, golfer_id: 1)

puts "✅ Done seeding!"
