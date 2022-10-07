import React, {useState, useEffect} from "react";
import Discs from "./Discs";
import AddDiscForm from "./AddDiscForm";

function DiscTable({types, manufacturers, golfers, onTableChange}) {
  const [shownBag, setBag] = useState('0');
  const [discs, setDiscs] = useState([]);
  const [active_add_disc, setActiveDiscForm] = useState(false);
  const add_disc_btn = (
    <button id="add_disc" onClick={() => setActiveDiscForm(true)}>Add Disc</button>
  );
  const add_disc_form = (
    <AddDiscForm 
      types={types}
      manufacturers={manufacturers}
      golfers={golfers}
      onFormCancel={() => setActiveDiscForm(false)}
      onDiscSubmit={handleDiscSubmit}
    />
  );
  const golfer_bag_options = golfers.map((golfer) => (
    <option key={golfer.id} value={golfer.id}>{golfer.name}</option>
  ));

  // table sorter part1 that stores the bag ID in state
  function handleSelectChange(e) {
    setBag(e.target.value);
    handleBagChange(e.target.value);
  }

  // table sorter that changes based on bag stored in state
  function handleBagChange(golfer_id=shownBag) {
    if (golfer_id === '0') {
      getAllDiscs();
    }
    else {
      fetch(`http://localhost:9292/golfers/${golfer_id}/owned_disc`)
        .then((r) => r.json())
        .then((discData) => setDiscs(discData));
    }
  }

  function getAllDiscs() {
    fetch("http://localhost:9292/discs")
      .then((r) => r.json())
      .then((discData) => setDiscs(discData));
  }

  function handleDiscSubmit(disc) {
    fetch("http://localhost:9292/discs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(disc)
    })
      .then((r) => r.json())
      .then((discData) => {
        if (discData.golfer_id === parseInt(shownBag) || shownBag === "0") {
          setDiscs([...discs, discData]);
        }
        setActiveDiscForm(false);
        onTableChange();
      });
  }

  function handleDiscDelete(discID) {
    fetch(`http://localhost:9292/discs/${discID}`, {
      method: "DELETE"
    })
      .then((r) => r.json())
      .then((discData) => {
        const updatedDiscs = discs.filter((disc) => discData.id !== disc.id);
        setDiscs(updatedDiscs);
        onTableChange();
      });
  }

  useEffect(() => {
    getAllDiscs();
  }, []);

  return (
    <>
    <div id="disc_container" className="container">
        <label>
          {"Show Golfer Bag: "}
          <select onChange={handleSelectChange}>
            <option value={0}>All</option>{golfer_bag_options}
          </select>
        </label>
        {active_add_disc ? null : add_disc_btn}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Plastic</th>
              <th>Weight {"(g)"}</th>
              <th>Speed</th>
              <th>Glide</th>
              <th>Turn</th>
              <th>Fade</th>
              <th>Type</th>
              <th>Manufacturer</th>
              <th>Owner</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <Discs discs={discs} types={types} manufacturers={manufacturers} golfers={golfers} onDiscDelete={handleDiscDelete}/>
        </table>
      </div>
      {active_add_disc ? add_disc_form : null}
    </>
  )
}

export default DiscTable;