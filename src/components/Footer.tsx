import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full opacity-60 text-sm p-2">
      <div className="flex flex-row justify-center items-center gap-2">
        <p className="mr-4">© {new Date().getFullYear()} MyMerit</p>
        <Link
          to="/contact"
          className="hover:opacity-80 transition-opacity transition-duration-300 ease-linear"
        >
          <p>Contact</p>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
