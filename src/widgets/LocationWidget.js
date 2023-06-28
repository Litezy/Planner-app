import React, { useEffect, useState } from 'react';

const LocationWidget = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch('https://ipinfo.io/json');
        const data = await response.json();
        const { city, region, country } = data;
        setLocation(`${city}, ${region}, ${country}`);
      } catch (error) {
        setLocation('Location information is unavailable.');
      }
    };

    fetchLocation();
  }, []);

  return (
    <div style={{ backgroundColor: '#f2f2f2', padding: '10px' }}>
      <h3>Location Widget</h3>
      <p>{location}</p>
    </div>
  );
};

export default LocationWidget;
