import React from "react";
import { Welcome } from "./Welcome";
import { useState, useEffect } from "react";

export const Popup = (props) => {    
  const [buttonPopup, setButtonPopup] = useState(true);
  useEffect(() => {
    setButtonPopup(true)
  }, [buttonPopup])

  return (
    <div>
      {console.log({ buttonPopup })}
      <Welcome trigger={buttonPopup} setTrigger={setButtonPopup}>        
      </Welcome>
    </div>
  );
}

export default Popup;
