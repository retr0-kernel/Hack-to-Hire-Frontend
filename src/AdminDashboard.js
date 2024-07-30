import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [flights, setFlights] = useState([]);
  const [users, setUsers] = useState([]);
  const [newFlight, setNewFlight] = useState({
    flight_id: '',
    airline: '',
    status: 'Scheduled',
    departure_gate: '',
    arrival_gate: '',
    scheduled_departure: '',
    scheduled_arrival: '',
  });
  const [isAddingFlight, setIsAddingFlight] = useState(false);
  const [editingFlight, setEditingFlight] = useState(null);
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    fetchFlights();
    fetchUsers();
  }, []);

  const fetchFlights = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('http://localhost:5000/admin/flights', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFlights(data);
    } catch (error) {
      console.error('Error fetching flights', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('http://localhost:5000/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  const handleAddFlight = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/flights', newFlight, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewFlight({
        flight_id: '',
        airline: '',
        status: 'Scheduled',
        departure_gate: '',
        arrival_gate: '',
        scheduled_departure: '',
        scheduled_arrival: '',
      });
      setIsAddingFlight(false);
      fetchFlights();
    } catch (error) {
      console.error('Error adding flight', error);
    }
  };

  const handleUpdateFlight = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/flights/${editingFlight._id}`, editingFlight, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditingFlight(null);
      fetchFlights();
    } catch (error) {
      console.error('Error updating flight', error);
    }
  };

  const handleDeleteFlight = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/flights/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchFlights();
    } catch (error) {
      console.error('Error deleting flight', error);
    }
  };

  const handleAssignFlight = async (flightId) => {
    try {
      const token = localStorage.getItem('token');
      const selectedUserId = users.find(user => user.username === selectedUser)._id;
      await axios.post(
        'http://localhost:5000/admin/assign-flight',
        { userId: selectedUserId, flightId: flightId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSelectedUser('');
      fetchFlights();
    } catch (error) {
      console.error('Error assigning flight', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={() => setIsAddingFlight(!isAddingFlight)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            {isAddingFlight ? 'Cancel' : '+ Add Flight'}
          </button>
        </div>

        {isAddingFlight && (
          <div className="bg-gray-800 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Add Flight</h2>
            <form onSubmit={handleAddFlight} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Flight ID"
                value={newFlight.flight_id}
                onChange={(e) => setNewFlight({ ...newFlight, flight_id: e.target.value })}
                className="bg-gray-700 text-white p-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Airline"
                value={newFlight.airline}
                onChange={(e) => setNewFlight({ ...newFlight, airline: e.target.value })}
                className="bg-gray-700 text-white p-2 rounded"
                required
              />
              <select
                value={newFlight.status}
                onChange={(e) => setNewFlight({ ...newFlight, status: e.target.value })}
                className="bg-gray-700 text-white p-2 rounded"
              >
                <option value="Scheduled">Scheduled</option>
                <option value="Delayed">Delayed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <input
                type="text"
                placeholder="Departure Gate"
                value={newFlight.departure_gate}
                onChange={(e) => setNewFlight({ ...newFlight, departure_gate: e.target.value })}
                className="bg-gray-700 text-white p-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Arrival Gate"
                value={newFlight.arrival_gate}
                onChange={(e) => setNewFlight({ ...newFlight, arrival_gate: e.target.value })}
                className="bg-gray-700 text-white p-2 rounded"
                required
              />
              <input
                type="datetime-local"
                value={newFlight.scheduled_departure}
                onChange={(e) => setNewFlight({ ...newFlight, scheduled_departure: e.target.value })}
                className="bg-gray-700 text-white p-2 rounded"
                required
              />
              <input
                type="datetime-local"
                value={newFlight.scheduled_arrival}
                onChange={(e) => setNewFlight({ ...newFlight, scheduled_arrival: e.target.value })}
                className="bg-gray-700 text-white p-2 rounded"
                required
              />
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out md:col-span-2"
              >
                Add Flight
              </button>
            </form>
          </div>
        )}

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Flights</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-300">
              <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                <tr>
                  <th className="px-6 py-3">Flight ID</th>
                  <th className="px-6 py-3">Airline</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Departure Gate</th>
                  <th className="px-6 py-3">Arrival Gate</th>
                  <th className="px-6 py-3">Scheduled Departure</th>
                  <th className="px-6 py-3">Scheduled Arrival</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {flights.map((flight) => (
                  <tr key={flight._id} className="border-b border-gray-700">
                    <td className="px-6 py-4">{flight.flight_id}</td>
                    <td className="px-6 py-4">{flight.airline}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        flight.status === 'Scheduled' ? 'bg-green-500' :
                        flight.status === 'Delayed' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}>
                        {flight.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{flight.departure_gate}</td>
                    <td className="px-6 py-4">{flight.arrival_gate}</td>
                    <td className="px-6 py-4">{new Date(flight.scheduled_departure).toLocaleString()}</td>
                    <td className="px-6 py-4">{new Date(flight.scheduled_arrival).toLocaleString()}</td>
                    <td className="px-6 py-4 flex space-x-2">
                      <button
                        onClick={() => setEditingFlight(flight)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteFlight(flight._id)}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-xs"
                      >
                        Delete
                      </button>
                      <select
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                        className="bg-gray-700 text-white py-1 px-2 rounded text-xs"
                      >
                        <option value="">Select User</option>
                        {users.map((user) => (
                          <option key={user._id} value={user.username}>
                            {user.username}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleAssignFlight(flight.flight_id)}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-xs"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {editingFlight && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Flight</h2>
            <form onSubmit={handleUpdateFlight} className="space-y-4">
              <input
                type="text"
                placeholder="Flight ID"
                value={editingFlight.flight_id}
                onChange={(e) => setEditingFlight({ ...editingFlight, flight_id: e.target.value })}
                className="w-full bg-gray-700 text-white p-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Airline"
                value={editingFlight.airline}
                onChange={(e) => setEditingFlight({ ...editingFlight, airline: e.target.value })}
                className="w-full bg-gray-700 text-white p-2 rounded"
                required
              />
              <select
                value={editingFlight.status}
                onChange={(e) => setEditingFlight({ ...editingFlight, status: e.target.value })}
                className="w-full bg-gray-700 text-white p-2 rounded"
              >
                <option value="Scheduled">Scheduled</option>
                <option value="Delayed">Delayed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <input
                type="text"
                placeholder="Departure Gate"
                value={editingFlight.departure_gate}
                onChange={(e) => setEditingFlight({ ...editingFlight, departure_gate: e.target.value })}
                className="w-full bg-gray-700 text-white p-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Arrival Gate"
                value={editingFlight.arrival_gate}
                onChange={(e) => setEditingFlight({ ...editingFlight, arrival_gate: e.target.value })}
                className="w-full bg-gray-700 text-white p-2 rounded"
                required
              />
              <input
                type="datetime-local"
                value={editingFlight.scheduled_departure}
                onChange={(e) => setEditingFlight({ ...editingFlight, scheduled_departure: e.target.value })}
                className="w-full bg-gray-700 text-white p-2 rounded"
                required
              />
              <input
                type="datetime-local"
                value={editingFlight.scheduled_arrival}
                onChange={(e) => setEditingFlight({ ...editingFlight, scheduled_arrival: e.target.value })}
                className="w-full bg-gray-700 text-white p-2 rounded"
                required
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingFlight(null)}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;