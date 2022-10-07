import React, {useState, useEffect} from "react";
import DiscTable from "./DiscTable";
import Golfer from "./Golfer";

function App() {
  const [isLoaded, setLoaded] = useState(false); // temporary loading tag
  const [seed_data, setSeedData] = useState({});
  const [change_counter, setCounter] = useState(0); // used for changing totals on golfer card

  useEffect(() => {
    fetch("http://localhost:9292/get_seed_info")
      .then((r) => r.json())
      .then((data) => {
        setSeedData(data);
        setLoaded(true);
      });
  }, []);

  if (!isLoaded) return <h1>Loading...</h1>
  return (
    <div id="the_app">
      <Golfer golfers={seed_data.golfers} classifications={seed_data.classifications} change_counter={change_counter} />
      <DiscTable types={seed_data.types} manufacturers={seed_data.manufacturers} golfers={seed_data.golfers} onTableChange={() => setCounter(change_counter + 1)}/>
    </div>
  );
}

export default App;
