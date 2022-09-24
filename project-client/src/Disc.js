import React, {useState, useEffect} from "react";

function Disc({disc, types, manufacturers, golfers}) {
  const [editOn, setEdit] = useState(false);
  const [typeData, setType] = useState({type: ''});
  const [manuData, setManu] = useState({manufacturer: ''});
  const [ownerData, setOwner] = useState({owner: ''});
  const [editData, setEditData] = useState({
    name: disc.name, plastic: disc.plastic, weight_in_g: disc.weight_in_g, speed: disc.speed, glide: disc.glide, turn: disc.turn, fade: disc.fade,
    type_id: disc.type_id, manufacturer_id: disc.manufacturer_id,  golfer_id: disc.golfer_id
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

  function handleEditChange(e) {
    const vName = e.target.name;

    setEditData({
      ...editData,
      [e.target.name]: vName === "name" || vName === "plastic" ? e.target.value : parseInt(e.target.value)
    });
  }

  useEffect(() => {
    fetch(`http://localhost:9292/types/${disc.type_id}`)
      .then((r) => r.json())
      .then((typeData) => setType({type: typeData.name}));

    fetch(`http://localhost:9292/manufacturers/${disc.manufacturer_id}`)
      .then((r) => r.json())
      .then((manuData) => setManu({manufacturer: manuData.name}));

    fetch(`http://localhost:9292/golfers/${disc.golfer_id}`)
      .then((r) => r.json())
      .then((ownerData) => setOwner({owner: ownerData.name}));
  }, [disc.type_id, disc.manufacturer_id, disc.golfer_id]);

  return (
    <tr className="disc_row">
      <td>{editOn ? <input type="text" name="name" value={editData.name} onChange={handleEditChange}/> : disc.name}</td>
      <td>{editOn ? <input type="text" name="plastic" value={editData.plastic} onChange={handleEditChange} /> : disc.plastic}</td>
      <td>{editOn ? <input type="number" name="weight_in_g" value={editData.weight_in_g} onChange={handleEditChange} /> : disc.weight_in_g}</td>
      <td>{editOn ? <input type="number" name="speed" value={editData.speed} onChange={handleEditChange} /> : disc.speed}</td>
      <td>{editOn ? <input type="number" name="glide" value={editData.glide} onChange={handleEditChange} /> : disc.glide}</td>
      <td>{editOn ? <input type="number" name="turn" value={editData.turn} onChange={handleEditChange} /> : disc.turn}</td>
      <td>{editOn ? <input type="number" name="fade" value={editData.fade} onChange={handleEditChange} /> : disc.fade}</td>
      <td>{editOn ? <select name="type_id" value={editData.type_id} onChange={handleEditChange}>{type_options}</select> : typeData.type}</td>
      <td>{editOn ? <select name="manufacturer_id" value={editData.manufacturer_id} onChange={handleEditChange}>{manu_options}</select> : manuData.manufacturer}</td>
      <td>{editOn ? <select name="golfer_id" value={editData.golfer_id} onChange={handleEditChange}>{golfer_options}</select> : ownerData.owner}</td>
      <td><button onClick={() => setEdit(true)}>Edit</button></td>
      <td><button>X</button></td>
    </tr>
  )
}

export default Disc;