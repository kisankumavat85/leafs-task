import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <div className="border-2">{children}</div>;
};

export default Layout;
