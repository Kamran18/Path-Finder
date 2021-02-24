import React from "react";
import Navbar from "../layout/Navbar";

function Layout({ algorithm, children }) {
  return (
    <>
      <Navbar algorithm={algorithm} />
      {children}
    </>
  );
}

export default Layout;
