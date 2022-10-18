import React, {useState, useEffect} from "react";
import DiscTable from "./DiscTable";
import Golfer from "./Golfer";

function App() {
  const [isLoaded, setLoaded] = useState(false); // temporary loading tag
  const [manufacturers, setManus] = useState([]);
  const [golfer_data, setGolferData] = useState([]);
  const [current_golfer, setGolfer] = useState({});

  useEffect(() => {
    fetch("http://localhost:9292/manufacturers")
      .then((r) => r.json())
      .then((ManuData) => setManus(ManuData));

    fetch("http://localhost:9292/golfers")
      .then((r) => r.json())
      .then((data) => {
        setGolferData(data);
        setGolfer(data[0]);
        setLoaded(true);
      });
  }, []);

  function handleGolferChange(e) {
    golfer_data.forEach((golfer) => {
      if (golfer.id === parseInt(e.target.value)) setGolfer(golfer);
    });
  }

  function handleDiscEdit(discID, theData) {
    fetch(`http://localhost:9292/discs/${discID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(theData)
    })
      .then((r) => r.json())
      .then((updatedData) => updateUserDiscEdit(updatedData));
  }

  function updateUserDiscEdit(discData) {
    const updatedDiscs = current_golfer.discs.map((disc) => {
      return discData.id === disc.id ? discData : disc;
    });
    setGolfer({...current_golfer, discs: updatedDiscs});
    updateGolferList({...current_golfer, discs: updatedDiscs})
  }

  function updateGolferList(newGolferData) {
    const updatedList = golfer_data.map((golfer) => {
      return newGolferData.id === golfer.id ? newGolferData : golfer;
    });
    setGolferData(updatedList);
  }

  if (!isLoaded) return <h1>Loading...</h1>
  return (
    <div id="the_app">
      <Golfer golfers={golfer_data} current_golfer={current_golfer} onGolferChange={handleGolferChange} />
      <DiscTable discs={current_golfer.discs} golfer={current_golfer.name} manufacturers={manufacturers} onDiscEdit={handleDiscEdit}/>
    </div>
  );
}

export default App;
