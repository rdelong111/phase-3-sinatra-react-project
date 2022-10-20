import React, {useState} from "react";

function AddGolferForm({onFormCancel, onGolferSubmit}) {
  const states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS",
  "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH",
  "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
  const [formData, setFormData] = useState({
    name: "", city: "", state: states[0], age: 0, pdga_number: 0, current_rating: 0, sponsored: false, classification: "None"
  });
  console.log(formData);

  const state_options = states.map((state) => (
    <option key={state} value={state}>{state}</option>
  ));
  const class_options = (
    <>
    <option value="None">None</option>
    <option value="Amateur">Amateur</option>
    <option value="Pro">Pro</option>
    </>
  );

  function handleFormChange(e) {
    const vName = e.target.name;
    if (vName === "sponsored") setFormData({...formData, sponsored: !formData.sponsored});
    else if (vName === "age" || vName === "pdga_number" || vName === "current_rating") {
      setFormData({...formData, [vName]: parseInt(e.target.value)});
    }
    else setFormData({...formData, [vName]: e.target.value});
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:9292/golfers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then((r) => r.json())
      .then((newGolfer) => {
        onGolferSubmit(newGolfer);
        onFormCancel();
      });
  }

  return (
    <div className="add_form_container">
      <h2>Add Golfer</h2>
      <form onSubmit={handleFormSubmit} className="add_form">
        <label>
          {"Name: "}
          <input type="text" name="name" onChange={handleFormChange} />
        </label><br/>
        <label>
          {"PDGA Number: "}
          <input type="number" step="1" name="pdga_number" onChange={handleFormChange} />
        </label><br/>
        <label>
          {"Age: "}
          <input type="number" step="1" name="age" onChange={handleFormChange} />
        </label><br/>
        <label>
          {"Location: "}
          <input type="text" name="city" placeholder="city..." onChange={handleFormChange} />
          <select name="state" onChange={handleFormChange}>{state_options}</select>
        </label><br/>
        <label>
          {"Classification: "}
          <select name="classification" onChange={handleFormChange}>{class_options}</select>
        </label><br/>
        <label>
          {"Current Rating: "}
          <input type="number" step="1" name="current_rating" onChange={handleFormChange} />
        </label><br/>
        <label>
          {"Sponsored?: "}
          <input type="checkbox" name="sponsored" onChange={handleFormChange} />
        </label><br/>
        <button type="submit">Submit</button>
      </form>
      <button onClick={onFormCancel}>Cancel</button>
    </div>
  )
}

export default AddGolferForm;