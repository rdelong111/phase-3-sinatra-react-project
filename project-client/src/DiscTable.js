import React, {useState, useEffect} from "react";
import Discs from "./Discs";
import AddDiscForm from "./AddDiscForm";

function DiscTable({discs, golfer, manufacturers, onDiscDelete, onDiscEdit}) {
  const [active_add_disc, setActiveDiscForm] = useState(false);
  const add_disc_btn = (
    <button id="add_disc" onClick={() => setActiveDiscForm(true)}>Add Disc</button>
  );
  /*
  const add_disc_form = (
    <AddDiscForm 
      types={types}
      manufacturers={manufacturers}
      golfers={golfers}
      onFormCancel={() => setActiveDiscForm(false)}
      onDiscSubmit={handleDiscSubmit}
    />
  );*/

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
      });
  }

  return (
    <>
    <div id="disc_container" className="container">
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
              <th></th>
              <th></th>
            </tr>
          </thead>
          <Discs discs={discs} manufacturers={manufacturers} onDiscDelete={onDiscDelete} onDiscEdit={onDiscEdit}/>
        </table>
      </div>
      {/*active_add_disc ? add_disc_form : null*/}
    </>
  )
}

export default DiscTable;