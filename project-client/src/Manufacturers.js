import React, {useState} from "react";

function Manufacturers({manufacturers, onManuSubmit}) {
  const [add_manu_on, setAddManuOn] = useState(false);
  const [new_manu_data, setManuData] = useState({name: ""});

  const manu_table_data = manufacturers.map((manufacturer) => (
    <tr key={manufacturer.name}><td>{manufacturer.name}</td></tr>
  ));
  const add_manu_form = (
    <>
    <form onSubmit={handleFormSubmit}>
      <input type="text" name="name" onChange={(e) => setManuData({name: e.target.value})} />
      <button type="submit">Submit Manufacturer</button>
    </form>
    <button onClick={handleFormCancel}>Cancel</button>
    </>
  );
  
  function handleFormCancel() {
    setManuData({name: ""});
    setAddManuOn(false);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:9292/manufacturers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(new_manu_data)
    })
      .then((r) => r.json())
      .then((newManu) => {
        onManuSubmit(newManu);
        setManuData({name: ""});
        setAddManuOn(false);
      });
  }

  return (
    <div className="container">
      <table>
        <thead>
          <tr><th>Manufacturers</th></tr>
        </thead>
        <tbody>
          {manu_table_data}
          <tr>
            <td>
              {add_manu_on ? add_manu_form : <button onClick={() => setAddManuOn(true)}>Add Manufacturer</button>}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Manufacturers;