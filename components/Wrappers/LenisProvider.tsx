import React from "react";
import ReactLenis from "lenis/react";

const ReactLenisWrap = ({ children }: { children: React.ReactNode }) => {
  return <ReactLenis root>{children}</ReactLenis>;
};

export default ReactLenisWrap;
