import React from "react";

function AddDiscForm({types, manufacturers, golfers}) {
  const type_options = types.map((type) => (
    <option key={type.id} value={type.id}>{type.name}</option>
  ));
  const manu_options = manufacturers.map((manufacturer) => (
    <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
  ));
  const golfer_options =  golfers.map((golfer) => (
    <option key={golfer.id} value={golfer.id}>{golfer.name}</option>
  ));

  return (
    <form>
      <label>
        {"Name: "}
        <input type="text" name="name" />
      </label>
      <label>
        {"Plastic: "}
        <input type="text" name="plastic" />
      </label>
      <label>
        {"Weight (g): "}
        <input type="integer" name="weight_in_g" />
      </label>
      <label>
        {"Speed: "}
        <input type="integer" name="speed" />
      </label>
      <label>
        {"Glide: "}
        <input type="integer" name="glide" />
      </label>
      <label>
        {"Turn: "}
        <input type="integer" name="turn" />
      </label>
      <label>
        {"Fade: "}
        <input type="integer" name="fade" />
      </label>
      <label>
        {"Type: "}
        <select>{type_options}</select>
      </label>
      <label>
        {"Manufacturer: "}
        <select>{manu_options}</select>
      </label>
      <label>
        {"Owner: "}
        <select>{golfer_options}</select>
      </label>
      <button>Submit</button>
      <button>Cancel</button>
    </form>
  )
}

export default AddDiscForm;