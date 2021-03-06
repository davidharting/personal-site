import React from "react";
import { rhythm } from "../utils/typography";

const Layout: React.FC = ({ children }) => {
  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      {children}
    </div>
  );
};

export default Layout;
