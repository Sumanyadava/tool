import React from "react";

const ImpUrg = () => {
  return (
    <div>
      
      <div className="urg grid grid-cols-2">
        <input
          type="radio"
          name="radio-8"
          className="radio radio-error h-5 w-5 rounded-sm"
        />

        <input
          type="radio"
          name="radio-8"
          className="radio radio-warning h-5 w-5 rounded-sm "
        />

        <input
          type="radio"
          name="radio-8"
          className="radio radio-success h-5 w-5 rounded-sm"
        />

        <input
          type="radio"
          name="radio-8"
          className="radio radio-success h-5 w-5 rounded-sm"
        />
      </div>
    </div>
  );
};

export default ImpUrg;
