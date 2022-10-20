import React, {useState} from "react";

function AddDiscForm({manufacturers, golfer, onFormCancel, onDiscSubmit}) {
  const [formData, setFormData] = useState({
    name: "", plastic: "", weight_in_g: null, speed: null, glide: null, turn: null, fade: null,
    disc_type: "Driver", manufacturer_id: manufacturers[0].id, golfer_id: golfer.id
  });

  // options for type, manufacturer, and golfer <select>'s
  const type_options = (
    <>
    <option value="Driver">Driver</option>
    <option value="Fairway">Fairway</option>
    <option value="Midrange">Midrange</option>
    <option value="Putter">Putter</option>
    </>
  );
  const manu_options = manufacturers.map((manufacturer) => (
    <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
  ));

  function handleFormChange(e) {
    const vName = e.target.name;

    setFormData({
      ...formData,
      [vName]: vName === "name" || vName === "plastic" || vName === "disc_type" ? e.target.value : parseFloat(e.target.value)
    });
  }

  // handles when submitting a new disc and checks for correct inputs
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
    else handleDiscSubmit(formData);
  }

  function handleDiscSubmit(discData) {
    fetch("http://localhost:9292/discs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(discData)
    })
      .then((r) => r.json())
      .then((newDisc) => {
        onDiscSubmit(newDisc)
        onFormCancel();
      });
  }

  return (
    <div id="add_disc_container" className="add_form_container">
      <h2>Add New Disc</h2>
      <form id="add_disc_form" className="add_form" onSubmit={handleFormSubmit}>
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
          <input type="number" step="0.5" name="speed" placeholder="1 - 14" onChange={handleFormChange} />
        </label><br/>
        <label>
          {"Glide: "}
          <input type="number" step="0.5" name="glide" placeholder="1 - 7" onChange={handleFormChange} />
        </label><br/>
        <label>
          {"Turn: "}
          <input type="number" step="0.5" name="turn" placeholder="-5 - 1" onChange={handleFormChange} />
        </label><br/>
        <label>
          {"Fade: "}
          <input type="number" step="0.5" name="fade" placeholder="0 - 5" onChange={handleFormChange} />
        </label><br/>
        <label>
          {"Type: "}
          <select name="disc_type" onChange={handleFormChange}>{type_options}</select>
        </label><br/>
        <label>
          {"Manufacturer: "}
          <select name="manufacturer_id" onChange={handleFormChange}>{manu_options}</select>
        </label><br/>
        <button type="submit">Submit Disc</button>
      </form>
      <button onClick={onFormCancel}>Cancel</button>
    </div>
  )
}

export default AddDiscForm;