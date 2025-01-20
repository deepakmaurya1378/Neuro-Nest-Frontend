import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-white text-center py-4 mt-8">
      <p className="text-sm">
        &copy; 2025 Therapy App. All rights reserved.
      </p>
      <div className="text-xs mt-2">
        <Link to="/UserManual" className="hover:text-gray-400">User Manual </Link> 
        <p className="hover:text-gray-400"> Contact Us</p>
      </div>
    </footer>
  );
};

export default Footer;
