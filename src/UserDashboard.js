import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFlights = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/flights', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFlights(response.data);
    } catch (error) {
      console.error('Error fetching flights', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 404) {
          setError('No flight data available. Please try again later.');
        } else {
          setError(`Failed to fetch flight data: ${error.response.data.message || 'Unknown error'}`);
        }
      } else if (error.request) {
        // The request was made but no response was received
        setError('No response from server. Please check your connection and try again.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Flight Status</h1>
          <button
            onClick={fetchFlights}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Update Flights'}
          </button>
        </div>

        {error && (
          <div className="bg-red-600 text-white p-4 rounded mb-4">
            {error}
          </div>
        )}

        {!isLoading && !error && flights.length === 0 && (
          <div className="bg-yellow-600 text-white p-4 rounded mb-4">
            No flights available at the moment.
          </div>
        )}

        {!isLoading && flights.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full bg-gray-800 shadow-lg rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-700">
                  <th className="px-4 py-3 text-left">Flight ID</th>
                  <th className="px-4 py-3 text-left">Airline</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Departure Gate</th>
                  <th className="px-4 py-3 text-left">Arrival Gate</th>
                  <th className="px-4 py-3 text-left">Scheduled Departure</th>
                  <th className="px-4 py-3 text-left">Scheduled Arrival</th>
                </tr>
              </thead>
              <tbody>
                {flights.map((flight) => (
                  <tr key={flight._id} className="border-b border-gray-700 hover:bg-gray-750 transition duration-300 ease-in-out">
                    <td className="px-4 py-3">{flight.flight_id}</td>
                    <td className="px-4 py-3">{flight.airline}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(flight.status)}`}>
                        {flight.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">{flight.departure_gate}</td>
                    <td className="px-4 py-3">{flight.arrival_gate}</td>
                    <td className="px-4 py-3">{flight.scheduled_departure}</td>
                    <td className="px-4 py-3">{flight.scheduled_arrival}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center items-center mt-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'Scheduled':
      return 'bg-green-500';
    case 'Delayed':
      return 'bg-yellow-500';
    case 'Cancelled':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

export default UserDashboard;