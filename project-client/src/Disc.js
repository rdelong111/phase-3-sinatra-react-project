import React, {useState, useEffect} from "react";

function Disc({disc}) {
  const [typeData, setType] = useState({type: ''});
  const [manuData, setManu] = useState({manufacturer: ''});
  const [ownerData, setOwner] = useState({owner: ''});

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
  }, []);

  return (
    <tr key={disc.id}>
      <td>{disc.name}</td>
      <td>{disc.plastic}</td>
      <td>{disc.weight_in_g}</td>
      <td>{disc.speed}</td>
      <td>{disc.glide}</td>
      <td>{disc.turn}</td>
      <td>{disc.fade}</td>
      <td>{typeData.type}</td>
      <td>{manuData.manufacturer}</td>
      <td>{ownerData.owner}</td>
    </tr>
  )
}

export default Disc;