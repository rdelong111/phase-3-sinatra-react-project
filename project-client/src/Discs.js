import React from "react";
import Disc from "./Disc";

function Discs({discs, types, manufacturers, golfers}) {
  const discData = discs.map((disc) => (
    <Disc key={disc.id} disc={disc} types={types} manufacturers={manufacturers} golfers={golfers} />
  ));

  return (
    <tbody>
      {discData}
    </tbody>
  )
}

export default Discs;