import React, {useState, useEffect} from "react";
import DiscTable from "./DiscTable";
import Golfer from "./Golfer";
import Manufacturers from "./Manufacturers";

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

  function handleDiscEdit(discData, old_type) {
    const updatedDiscs = current_golfer.discs.map((disc) => {
      return discData.id === disc.id ? discData : disc;
    });
    const new_golfer_data = {
      ...current_golfer,
      discs: updatedDiscs,
      type_amounts: {
        ...current_golfer.type_amounts,
        [old_type]: current_golfer.type_amounts[old_type] - 1,
        [discData.disc_type]: current_golfer.type_amounts[discData.disc_type] + 1
      }
    };
    setGolfer(new_golfer_data);
    updateGolferList(new_golfer_data);
  }

  function updateGolferList(newGolferData) {
    const updatedList = golfer_data.map((golfer) => {
      return newGolferData.id === golfer.id ? newGolferData : golfer;
    });
    setGolferData(updatedList);
  }

  function handleDiscDelete(deletedDisc) {
    const updatedDiscs = current_golfer.discs.filter((disc) => disc.id !== deletedDisc.id);
    const new_golfer_data = {
      ...current_golfer,
      discs: updatedDiscs,
      type_amounts: {
        ...current_golfer.type_amounts,
        [deletedDisc.disc_type]: current_golfer.type_amounts[deletedDisc.disc_type] - 1
      }
    };
    setGolfer(new_golfer_data);
    updateGolferList(new_golfer_data);
  }

  function handleDiscSubmit(newDisc) {
    const new_golfer_data = {
      ...current_golfer,
      discs: [...current_golfer.discs, newDisc],
      type_amounts: {
        ...current_golfer.type_amounts,
        [newDisc.disc_type]: current_golfer.type_amounts[newDisc.disc_type] + 1
      }
    };
    setGolfer(new_golfer_data);
    updateGolferList(new_golfer_data);
  }

  function handleManuSubmit(newManu) {
    setManus([...manufacturers, newManu]);
  }

  if (!isLoaded) return <h1>Loading...</h1>
  return (
    <div id="the_app">
      <Golfer
        golfers={golfer_data}
        current_golfer={current_golfer}
        onGolferChange={handleGolferChange} 
        onGolferSubmit={(newGolfer) => setGolferData([...golfer_data, newGolfer])}
      />
      <DiscTable 
        discs={current_golfer.discs}
        golfer={current_golfer}
        manufacturers={manufacturers}
        onDiscDelete={handleDiscDelete}
        onDiscEdit={handleDiscEdit}
        onDiscSubmit={handleDiscSubmit}
      />
      <Manufacturers manufacturers={manufacturers} onManuSubmit={handleManuSubmit} />
    </div>
  );
}

export default App;
