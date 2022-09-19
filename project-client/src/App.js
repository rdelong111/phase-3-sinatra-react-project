import React, {useState, useEffect} from "react";
import Discs from "./Discs";
import Golfer from "./Golfer";
import AddDiscForm from "./AddDiscForm";

function App() {
  const [isLoaded, setLoaded] = useState(false);
  const [discs, setDiscs] = useState([]);
  const [golfer, setGolfer] = useState([]);
  const [classifications, setClasses] = useState([{name: "None"}]);
  const [types, setTypes] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [active_add_disc, setActiveDisc] = useState(false);
  const add_disc_btn = (
    <button id="add_disc" onClick={() => setActiveDisc(true)}>Add Disc</button>
  );
  const add_disc_form = (
    <AddDiscForm 
      types={types}
      manufacturers={manufacturers}
      golfers={golfer}
    />
  );

  useEffect(() => {
    fetch("http://localhost:9292/discs")
      .then((r) => r.json())
      .then((discData) => setDiscs(discData));

    fetch("http://localhost:9292/golfers")
      .then((r) => r.json())
      .then((userData) => {
        setGolfer(userData)
        setLoaded(true);
      });

    fetch("http://localhost:9292/classifications")
      .then((r) => r.json())
      .then((classData) => setClasses(classData));
      
    fetch("http://localhost:9292/types")
      .then((r) => r.json())
      .then((typeData) => setTypes(typeData));

    fetch("http://localhost:9292/manufacturers")
      .then((r) => r.json())
      .then((manuData) => setManufacturers(manuData));
  }, []);

  if (!isLoaded) return <h1>Loading...</h1>
  return (
    <div id="the_app">
      <Golfer golfers={golfer} classifications={classifications} />
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
              <th>Owner</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <Discs discs={discs}/>
        </table>
      </div>
      {active_add_disc ? add_disc_form : null}
    </div>
  );
}

export default App;
