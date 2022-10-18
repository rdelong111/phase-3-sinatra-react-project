import React from "react";
import Disc from "./Disc";

function Discs({discs, manufacturers, onDiscDelete, onDiscEdit}) {
  const discData = discs.map((disc) => (
    <Disc key={disc.id} disc={disc} manufacturers={manufacturers} onDiscDelete={onDiscDelete} onDiscEdit={onDiscEdit} />
  ));

  return (
    <tbody>
      {discData}
    </tbody>
  )
}

export default Discs;