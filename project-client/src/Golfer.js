import React, {useState} from "react";
import AddGolferForm from "./AddGolferForm";

function Golfer({golfers, current_golfer, onGolferChange, onGolferSubmit}) {
  const [show_add_golfer, setAddForm] = useState(false);
  const golfer_types = current_golfer.type_amounts;
  const disc_amount = Object.values(golfer_types).reduce((prev, curr) => prev + curr, 0);

  const golfer_options =  golfers.map((golfer) => (
    <option key={golfer.id} value={golfer.id}>{golfer.name}</option>
  ));

  return (
    <div id="golfer_container" className="container">
      <figure>
        <img src="https://www.logolynx.com/images/logolynx/fd/fd76507f2630314efc5b6772dd903079.jpeg" alt="PDGA Symbol" />
        <figcaption>{current_golfer.name}</figcaption>
      </figure>
      <p>PDGA Number: {current_golfer.pdga_number}</p>
      <p>Age: {current_golfer.age}</p>
      <p>Location: {current_golfer.location}</p>
      <p>Classification: {current_golfer.classification}</p>
      <p>Current Rating: {current_golfer.current_rating}</p>
      <p>Sponsored: {current_golfer.sponsored ? "👍" : "👎"}</p><br />
      <p>Drivers: {golfer_types.Driver}</p>
      <p>Fairways: {golfer_types.Fairway}</p>
      <p>Midranges: {golfer_types.Midrange}</p>
      <p>Putters: {golfer_types.Putter}</p>
      <p>Disc Bag Total: {disc_amount}</p>
      <label id="change_golfer">
        {"Change Golfer: "}
        <select name="golferoptions" onChange={onGolferChange}>
          {golfer_options}
        </select>
      </label><br /><br />
      {show_add_golfer ?
        <AddGolferForm onFormCancel={() => setAddForm(false)} onGolferSubmit={onGolferSubmit} />
        :
        <button onClick={() => setAddForm(true)}>Add Golfer</button>
      }
    </div>
  )
}

export default Golfer;