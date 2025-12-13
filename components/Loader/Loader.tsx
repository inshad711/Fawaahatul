import React from "react";
import "./Style.css";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-20">
      <div className="loader">
        <div
          className="orbe"
          style={{ "--index": 0 } as React.CSSProperties}
        ></div>
        <div
          className="orbe"
          style={{ "--index": 1 } as React.CSSProperties}
        ></div>
        <div
          className="orbe"
          style={{ "--index": 2 } as React.CSSProperties}
        ></div>
        <div
          className="orbe"
          style={{ "--index": 3 } as React.CSSProperties}
        ></div>
        <div
          className="orbe"
          style={{ "--index": 4 } as React.CSSProperties}
        ></div>
      </div>
    </div>
  );
};

export default Loader;
