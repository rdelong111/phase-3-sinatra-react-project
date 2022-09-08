import React, {useState} from "react";

function Golfer({golfers, classifications}) {
  const [the_golfer, setGolfer] = useState(golfers[0]);

  const golfer_options =  golfers.map((golfer) => (
    <option key={golfer.id} value={golfer.id}>{golfer.name}</option>
  ));

  function handleGolferChange(e) {
    fetch(`http://localhost:9292/golfers/${e.target.value}`)
      .then((r) => r.json())
      .then((golferData) => setGolfer(golferData));
  }

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
      <p>Sponsored: {the_golfer.sponsored ? "👍" : "👎"}</p>
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