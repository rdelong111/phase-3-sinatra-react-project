import React, {useState} from "react";
import Discs from "./Discs";
import AddDiscForm from "./AddDiscForm";

function DiscTable({discs, golfer, manufacturers, onDiscDelete, onDiscEdit, onDiscSubmit}) {
  const [active_add_disc, setActiveDiscForm] = useState(false);
  const add_disc_btn = (
    <button id="add_disc" onClick={() => setActiveDiscForm(true)}>Add Disc</button>
  );
  const add_disc_form = (
    <AddDiscForm 
      manufacturers={manufacturers}
      golfer={golfer}
      onFormCancel={() => setActiveDiscForm(false)}
      onDiscSubmit={onDiscSubmit}
    />
  );

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
      {active_add_disc ? add_disc_form : null}
    </>
  )
}

export default DiscTable;