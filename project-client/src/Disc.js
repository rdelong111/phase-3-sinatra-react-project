import React, {useState, useEffect} from "react";

function Disc({disc, types, manufacturers, golfers, onDiscDelete}) {
  const [editOn, setEdit] = useState(false); // changes if discs is displaying text or inputs
  const [connections, setConnections] = useState({current_type: "", current_manu: "", current_owner: ""});
  const [editData, setEditData] = useState({
    name: disc.name, plastic: disc.plastic, weight_in_g: disc.weight_in_g, speed: disc.speed, glide: disc.glide, turn: disc.turn, fade: disc.fade,
    type_id: disc.type_id, manufacturer_id: disc.manufacturer_id,  golfer_id: disc.golfer_id
  });

  // options for type, manufacturer, and golfer <select>'s when editing a disc
  const type_options = types.map((type) => (
    <option key={type.id} value={type.id}>{type.name}</option>
  ));
  const manu_options = manufacturers.map((manufacturer) => (
    <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
  ));
  const golfer_options =  golfers.map((golfer) => (
    <option key={golfer.id} value={golfer.id}>{golfer.name}</option>
  ));

  function handleEditChange(e) {
    const vName = e.target.name;

    setEditData({
      ...editData,
      [e.target.name]: vName === "name" || vName === "plastic" ? e.target.value : parseFloat(e.target.value)
    });
  }

  function handleEditSubmit() {
    fetch(`http://localhost:9292/discs/${disc.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editData)
    })
      .then(() => {
        setEdit(false);
        getConnections(disc.id);
      });
  }

  // gets the relationships' names for a disc
  function getConnections(id) {
    fetch(`http://localhost:9292/discs/${id}/connections`)
      .then((r) => r.json())
      .then((connection_data) => setConnections(connection_data));
  }

  useEffect(() => {
    getConnections(disc.id);
  }, [disc.id]);

  return (
    <tr className="disc_row">
      <td>{editOn ? <input type="text" name="name" value={editData.name} onChange={handleEditChange}/> : editData.name}</td>
      <td>{editOn ? <input type="text" name="plastic" value={editData.plastic} onChange={handleEditChange} /> : editData.plastic}</td>
      <td>{editOn ? <input type="number" name="weight_in_g" value={editData.weight_in_g} onChange={handleEditChange} /> : editData.weight_in_g}</td>
      <td>{editOn ? <input type="number" step="0.5" name="speed" value={editData.speed} onChange={handleEditChange} /> : editData.speed}</td>
      <td>{editOn ? <input type="number" step="0.5" name="glide" value={editData.glide} onChange={handleEditChange} /> : editData.glide}</td>
      <td>{editOn ? <input type="number" step="0.5" name="turn" value={editData.turn} onChange={handleEditChange} /> : editData.turn}</td>
      <td>{editOn ? <input type="number" step="0.5" name="fade" value={editData.fade} onChange={handleEditChange} /> : editData.fade}</td>
      <td>{editOn ? <select name="type_id" value={editData.type_id} onChange={handleEditChange}>{type_options}</select> : connections.current_type}</td>
      <td>{editOn ? <select name="manufacturer_id" value={editData.manufacturer_id} onChange={handleEditChange}>{manu_options}</select> : connections.current_manu}</td>
      <td>{editOn ? <select name="golfer_id" value={editData.golfer_id} onChange={handleEditChange}>{golfer_options}</select> : connections.current_owner}</td>
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