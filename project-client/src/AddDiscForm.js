import React, {useState} from "react";

function AddDiscForm({types, manufacturers, golfers}) {
  const [formData, setFormData] = useState({
    name: "", plastic: "", weight_in_g: 0, speed: 0, glide: 0, turn: 0, fade: 0,
    type_id: types[0].id, manufacturer_id: manufacturers[0].id,  golfer_id: golfers[0].id
  });
  console.log(formData)

  const type_options = types.map((type) => (
    <option key={type.id} value={type.id}>{type.name}</option>
  ));
  const manu_options = manufacturers.map((manufacturer) => (
    <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
  ));
  const golfer_options =  golfers.map((golfer) => (
    <option key={golfer.id} value={golfer.id}>{golfer.name}</option>
  ));

  function handleFormChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.name === "name" || e.target.name === "plastic" ? e.target.value : parseInt(e.target.value)
    });
  }

  return (
    <div id="add_disc_container">
      <form id="add_disc_form">
        <label>
          {"Name: "}
          <input type="text" name="name" onChange={handleFormChange} />
        </label><br/>
        <label>
          {"Plastic: "}
          <input type="text" name="plastic" onChange={handleFormChange} />
        </label><br/>
        <label>
          {"Weight (g): "}
          <input type="number" name="weight_in_g" onChange={handleFormChange} />
        </label><br/>
        <label>
          {"Speed: "}
          <input type="number" name="speed" onChange={handleFormChange} />
        </label><br/>
        <label>
          {"Glide: "}
          <input type="number" name="glide" onChange={handleFormChange} />
        </label><br/>
        <label>
          {"Turn: "}
          <input type="number" name="turn" onChange={handleFormChange} />
        </label><br/>
        <label>
          {"Fade: "}
          <input type="number" name="fade" onChange={handleFormChange} />
        </label><br/>
        <label>
          {"Type: "}
          <select name="type_id">{type_options}</select>
        </label><br/>
        <label>
          {"Manufacturer: "}
          <select name="manufacturer_id">{manu_options}</select>
        </label><br/>
        <label>
          {"Owner: "}
          <select name="golfer_id">{golfer_options}</select>
        </label><br/>
        <button>Submit</button>
      </form>
      <button onClick={() => console.log('test')}>Cancel</button>
    </div>
  )
}

export default AddDiscForm;