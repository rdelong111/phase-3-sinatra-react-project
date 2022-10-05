import React, {useState, useEffect} from "react";
import DiscTable from "./DiscTable";
import Golfer from "./Golfer";

function App() {
  const [isLoaded, setLoaded] = useState(false); // temporary loading tag
  const [golfers, setGolfers] = useState([]);
  const [classifications, setClasses] = useState([{name: "None"}]);
  const [types, setTypes] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9292/golfers")
      .then((r) => r.json())
      .then((userData) => setGolfers(userData));

    fetch("http://localhost:9292/classifications")
      .then((r) => r.json())
      .then((classData) => setClasses(classData));
      
    fetch("http://localhost:9292/types")
      .then((r) => r.json())
      .then((typeData) => setTypes(typeData));

    fetch("http://localhost:9292/manufacturers")
      .then((r) => r.json())
      .then((manuData) => {
        setManufacturers(manuData)
        setLoaded(true);
      });
  }, []);

  if (!isLoaded) return <h1>Loading...</h1>
  return (
    <div id="the_app">
      <Golfer golfers={golfers} classifications={classifications} />
      <DiscTable types={types} manufacturers={manufacturers} golfers={golfers}/>
    </div>
  );
}

export default App;
