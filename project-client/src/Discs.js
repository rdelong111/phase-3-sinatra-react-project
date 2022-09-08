import React from "react";
import Disc from "./Disc";

function Discs({discs}) {
  const discData = discs.map((disc) => (
    <Disc key={disc.id} disc={disc} />
  ));

  return (
    <tbody>
      {discData}
    </tbody>
  )
}

export default Discs;