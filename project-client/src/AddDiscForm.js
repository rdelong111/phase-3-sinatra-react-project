import React, {useState} from "react";

function AddDiscForm({types, manufacturers, golfers, onFormCancel, onDiscSubmit}) {
  const [formData, setFormData] = useState({
    name: "", plastic: "", weight_in_g: null, speed: null, glide: null, turn: null, fade: null,
    type_id: types[0].id, manufacturer_id: manufacturers[0].id,  golfer_id: golfers[0].id
  });

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
    const vName = e.target.name;

    setFormData({
      ...formData,
      [e.target.name]: vName === "name" || vName === "plastic" ? e.target.value : parseInt(e.target.value)
    });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    if (formData.name === "") {
      alert("Enter a name.");
    }
    else if (!formData.weight_in_g || formData.weight_in_g <= 0 || formData.weight_in_g > 200) {
      alert("Enter a correct weight.");
    }
    else if (!formData.speed || formData.speed < 1 || formData.speed > 14) {
      alert("Enter a correct speed.");
    }
    else if (!formData.glide || formData.glide < 1 || formData.glide > 7) {
      alert("Enter a correct glide.");
    }
    else if ((!formData.turn && formData.turn !== 0) || formData.turn < -5 || formData.turn > 1) {
      alert("Enter a correct turn.");
    }
    else if ((!formData.fade && formData.fade !== 0) || formData.fade < 0 || formData.fade > 5) {
      alert("Enter a correct fade.");
    }
    else onDiscSubmit(formData);
  }

  return (
    <div id="add_disc_container">
      <form id="add_disc_form" onSubmit={handleFormSubmit}>
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
          <input type="number" name="weight_in_g" placeholder="<= 200" onChange={handleFormChange} />
        </label><br/>
        <label>
          {"Speed: "}
          <input type="number" name="speed" placeholder="1 - 14" onChange={handleFormChange} />
        </label><br/>
        <label>
          {"Glide: "}
          <input type="number" name="glide" placeholder="1 - 7" onChange={handleFormChange} />
        </label><br/>
        <label>
          {"Turn: "}
          <input type="number" name="turn" placeholder="-5 - 1" onChange={handleFormChange} />
        </label><br/>
        <label>
          {"Fade: "}
          <input type="number" name="fade" placeholder="0 - 5" onChange={handleFormChange} />
        </label><br/>
        <label>
          {"Type: "}
          <select name="type_id" onChange={handleFormChange}>{type_options}</select>
        </label><br/>
        <label>
          {"Manufacturer: "}
          <select name="manufacturer_id" onChange={handleFormChange}>{manu_options}</select>
        </label><br/>
        <label>
          {"Owner: "}
          <select name="golfer_id" onChange={handleFormChange}>{golfer_options}</select>
        </label><br/>
        <button type="submit">Submit Disc</button>
      </form>
      <button onClick={onFormCancel}>Cancel</button>
    </div>
  )
}

export default AddDiscForm;