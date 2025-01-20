import  { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
const SearchTherapists = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [therapists, setTherapists] = useState([]);

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const response = await axiosInstance.get(`/api/therapists?search=${searchTerm}`);
        setTherapists(response.data);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        alert('Error fetching therapists');
      }
    };

    if (searchTerm) fetchTherapists();
  }, [searchTerm]);

  return (
    <div>
      <h1>Search Therapists</h1>
      <input
        type="text"
        placeholder="Search by name or specialty"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {therapists.map((therapist) => (
          <li key={therapist._id}>{therapist.name} - {therapist.specialty}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchTherapists;