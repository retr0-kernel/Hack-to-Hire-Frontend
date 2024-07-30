import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FlightList() {
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/flights');
                setFlights(data);
            } catch (error) {
                console.error('Error fetching flights:', error);
            }
        };
        fetchFlights();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Flight Statuses</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Flight Number</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Flight Name</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Status</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Departure Gate</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Arrival Gate</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Scheduled Departure</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Scheduled Arrival</th>
                    </tr>
                </thead>
                <tbody>
                    {flights.map(flight => (
                        <tr key={flight._id} style={{ textAlign: 'center', backgroundColor: '#fff', borderBottom: '1px solid #ddd' }}>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{flight.flight_id}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{flight.airline}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{flight.status}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{flight.departure_gate}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{flight.arrival_gate}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{new Date(flight.scheduled_departure).toLocaleString()}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{new Date(flight.scheduled_arrival).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default FlightList;
