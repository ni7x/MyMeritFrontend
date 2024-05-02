import { Link } from "react-router-dom";

const MeritLink = ({
  to,
  children,
  className,
}: {
  to: string;
  children: JSX.Element | JSX.Element[] | string;
  className?: string;
}) => {
  return (
    <li
      className={`w-max whitespace-nowrap opacity-70 hover:opacity-100 transition-opacity transition-duration-300 ease-linear ${
        className ? className : ""
      }`}
    >
      <Link to={to}>{children}</Link>
    </li>
  );
};

export default MeritLink;
