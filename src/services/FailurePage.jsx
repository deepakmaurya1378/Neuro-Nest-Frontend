// FailurePage.js
import { Link } from "react-router-dom";
const FailurePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-semibold text-red-600">Payment Failed or Canceled</h1>
        <p className="mt-4 text-lg mb-4">There was an issue with your payment. Please try again.</p>
        <Link className="mt-6 py-2 px-4 bg-blue-600 text-white rounded-md " to="/sessions">Retry</Link>
      </div>
    </div>
  );
};

export default FailurePage;
