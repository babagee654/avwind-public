import React from "react";
import {
  Link,
  useMatch,
  useResolvedPath,
} from "react-router-dom";


export default function CustomLink({ children, to, ...props }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link
      className={`${match ? 'active-nav-link' : 'nav-link'}`}
      to={to}
      {...props}
    >
      {children}
    </Link>
  );
}