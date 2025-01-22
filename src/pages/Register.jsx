import { useState } from 'react';
import { useDispatch } from "react-redux";
import { register } from "../features/authSlice";
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Client');
  const [showTherapistForm, setShowTherapistForm] = useState(false); // To show second form for therapist
  const [phone, setPhone] = useState('');
  const [qualification, setQualification] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [licenseDocument, setLicenseDocument] = useState(null);  // For uploading license document
  const [isLoading, setIsLoading] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState(null); // To track registration status
  const [pendingVerification, setPendingVerification] = useState(false); // To handle pending verification message

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = {
        name,
        email,
        password,
        role,
        phone,
        qualification,
        specialization,
        licenseNumber,
        licenseDocument,
      };


      await dispatch(register(formData));
      setRegistrationStatus('success'); 
      setPendingVerification(true);
      if (role === "Client") {
        alert("Registration was successful!")
      }
      else {
        alert('Registration was successful! Your verification will take up to 24 hours.');
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert('Error during registration: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);
    setShowTherapistForm(selectedRole === 'Therapist');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">Register</h1>
        
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <select
              value={role}
              onChange={handleRoleChange}
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="Client">Client</option>
              <option value="Therapist">Therapist</option>
            </select>
          </div>

          {showTherapistForm && (
            <div className="space-y-4 mt-4">
              <div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Qualification"
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Specialization (e.g., CBT, Psychoanalysis)"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="License Number"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <input
                  type="file"
                  accept=".pdf,.jpg,.png"
                  onChange={(e) => setLicenseDocument(e.target.files[0])}
                  className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
                <p className="text-sm text-gray-600 mt-2">Upload your therapist license document (PDF, JPG, or PNG).</p>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>

        {pendingVerification && (
          <div className="mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-gray-700">
            <p>Your registration has been successfully submitted! Please note that your verification process will take up to 12 hours. You will be contacted via phone and email for further steps.</p>
          </div>
        )}

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
           <button
              onClick={() => navigate("/")} 
              className="text-blue-500 hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
