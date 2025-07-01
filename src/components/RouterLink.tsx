import React from "react";
import { Link } from "react-router";

interface RouterLinkProps extends React.ComponentProps<"a"> {
  children: React.ReactNode;
  href: string;
}

const RouterLink = ({ href, children, ...props }: RouterLinkProps) => {
  return (
    <Link to={href} {...props}>
      {children}
    </Link>
  );
};

export default RouterLink;
