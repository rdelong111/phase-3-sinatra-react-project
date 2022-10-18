import React, {useState} from "react";

function Disc({disc, manufacturers, onDiscDelete, onDiscEdit}) {
  const [editOn, setEdit] = useState(false); // changes if discs is displaying text or inputs
  const [editData, setEditData] = useState({
    name: disc.name, plastic: disc.plastic, weight_in_g: disc.weight_in_g, speed: disc.speed, glide: disc.glide, turn: disc.turn, fade: disc.fade,
    disc_type: disc.disc_type, manufacturer_id: disc.manufacturer_id
  });

  // options for type and manufacturer <select>'s when editing a disc
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

  function handleEditChange(e) {
    const vName = e.target.name;
    if (vName === "name" || vName === "plastic" || vName === "disc_type") {
      setEditData({...editData, [vName]: e.target.value});
    }
    else if (vName === "manufacturer_id") {
      setEditData({...editData, [vName]: parseInt(e.target.value)});
    }
    else setEditData({...editData, [vName]: parseFloat(e.target.value)});
  }

  function handleEditSubmit() {
    if (editData.name === "") {
      alert("Enter a name.");
    }
    else if (!editData.weight_in_g || editData.weight_in_g <= 0 || editData.weight_in_g > 200) {
      alert("Enter a correct weight.");
    }
    else if (!editData.speed || editData.speed < 1 || editData.speed > 14) {
      alert("Enter a correct speed.");
    }
    else if (!editData.glide || editData.glide < 1 || editData.glide > 7) {
      alert("Enter a correct glide.");
    }
    else if ((!editData.turn && editData.turn !== 0) || editData.turn < -5 || editData.turn > 1) {
      alert("Enter a correct turn.");
    }
    else if ((!editData.fade && editData.fade !== 0) || editData.fade < 0 || editData.fade > 5) {
      alert("Enter a correct fade.");
    }
    else {
      onDiscEdit(disc.id, editData);
      setEdit(false);
    }
  }

  return (
    <tr className="disc_row">
      <td>{editOn ? <input type="text" name="name" value={editData.name} onChange={handleEditChange}/> : disc.name}</td>
      <td>{editOn ? <input type="text" name="plastic" value={editData.plastic} onChange={handleEditChange} /> : disc.plastic}</td>
      <td>{editOn ? <input type="number" name="weight_in_g" value={editData.weight_in_g} onChange={handleEditChange} /> : disc.weight_in_g}</td>
      <td>{editOn ? <input type="number" step="0.5" name="speed" value={editData.speed} onChange={handleEditChange} /> : disc.speed}</td>
      <td>{editOn ? <input type="number" step="0.5" name="glide" value={editData.glide} onChange={handleEditChange} /> : disc.glide}</td>
      <td>{editOn ? <input type="number" step="0.5" name="turn" value={editData.turn} onChange={handleEditChange} /> : disc.turn}</td>
      <td>{editOn ? <input type="number" step="0.5" name="fade" value={editData.fade} onChange={handleEditChange} /> : disc.fade}</td>
      <td>{editOn ? <select name="disc_type" value={editData.disc_type} onChange={handleEditChange}>{type_options}</select> : disc.disc_type}</td>
      <td>{editOn ? <select name="manufacturer_id" value={editData.manufacturer_id} onChange={handleEditChange}>{manu_options}</select> : disc.manufacturer.name}</td>
      <td>
        {editOn ? 
          <button onClick={handleEditSubmit}>Submit Edit</button>
          :
          <button onClick={() => setEdit(true)}>Edit</button>
        }
      </td>
      <td><button onClick={() => onDiscDelete(disc.id)}>X</button></td>
    </tr>
  )
}

export default Disc;