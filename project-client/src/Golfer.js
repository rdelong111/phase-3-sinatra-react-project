import React, {useState, useEffect} from "react";

function Golfer({golfers, classifications, change_counter}) {
  const [the_golfer, setGolfer] = useState(golfers[0]);
  const [golfer_types, setTypes] = useState({Driver: 0, Fairway: 0, Midrange: 0, Putter: 0});
  const disc_amount = Object.values(golfer_types).reduce((prev, curr) => prev + curr, 0);

  const golfer_options =  golfers.map((golfer) => (
    <option key={golfer.id} value={golfer.id}>{golfer.name}</option>
  ));

  function handleGolferChange(e) {
    fetch(`http://localhost:9292/golfers/${e.target.value}`)
      .then((r) => r.json())
      .then((golferData) => setGolfer(golferData));
  }

  useEffect(() => {
    fetch(`http://localhost:9292/golfers/${the_golfer.id}/owned_amounts`)
      .then((r) => r.json())
      .then((amounts) => setTypes(amounts));
  }, [the_golfer.id, change_counter]);

  return (
    <div id="golfer_container" className="container">
      <figure>
        <img src="https://www.logolynx.com/images/logolynx/fd/fd76507f2630314efc5b6772dd903079.jpeg" alt="PDGA Symbol" />
        <figcaption>{the_golfer.name}</figcaption>
      </figure>
      <p>PDGA Number: {the_golfer.pdga_number}</p>
      <p>Age: {the_golfer.age}</p>
      <p>Location: {the_golfer.location}</p>
      <p>Classification: {classifications[the_golfer.classification_id - 1].name}</p>
      <p>Current Rating: {the_golfer.current_rating}</p>
      <p>Sponsored: {the_golfer.sponsored ? "👍" : "👎"}</p><br />
      <p>Drivers: {golfer_types.Driver}</p>
      <p>Fairways: {golfer_types.Fairway}</p>
      <p>Midranges: {golfer_types.Midrange}</p>
      <p>Putters: {golfer_types.Putter}</p>
      <p>Disc Bag Total: {disc_amount}</p>
      <label id="change_golfer">
        {"Change Golfer: "}
        <select name="golferoptions" onChange={handleGolferChange}>
          {golfer_options}
        </select>
      </label>
    </div>
  )
}

export default Golfer;