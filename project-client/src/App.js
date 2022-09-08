import React, {useState, useEffect} from "react";
import Discs from "./Discs"

function App() {
  const [discs, setDiscs] = useState([]);
  const [golfer, setGolfer] = useState({
    name: "",
    location: "",
    age: 0,
    pdga_number: 0,
    current_rating: 0,
    sponsored: false,
    classification_id: 1
  });
  const [classifications, setClasses] = useState([{name: "None"}]);

  useEffect(() => {
    fetch("http://localhost:9292/discs")
      .then((r) => r.json())
      .then((discData) => setDiscs(discData));

    fetch("http://localhost:9292/golfers")
      .then((r) => r.json())
      .then((userData) => setGolfer(userData[0]));

    fetch("http://localhost:9292/classifications")
      .then((r) => r.json())
      .then((classData) => setClasses(classData));
  }, []);

  return (
    <div id="the_app">
      <div id="golfer_container" className="container">
        <figure>
          <img src="https://www.logolynx.com/images/logolynx/fd/fd76507f2630314efc5b6772dd903079.jpeg" alt="PDGA Symbol" />
          <figcaption>{golfer.name}</figcaption>
        </figure>
        <p>PDGA Number: {golfer.pdga_number}</p>
        <p>Age: {golfer.age}</p>
        <p>Location: {golfer.location}</p>
        <p>Classification: {classifications[golfer.classification_id - 1].name}</p>
        <p>Current Rating: {golfer.current_rating}</p>
        <p>Sponsored: {golfer.sponsored ? "👍" : "👎"}</p>
      </div>
      <div id="disc_container" className="container">
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
            </tr>
          </thead>
          <Discs discs={discs}/>
        </table>
      </div>
    </div>
  );
}

export default App;
