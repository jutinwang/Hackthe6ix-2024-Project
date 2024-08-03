import React, { useState, useEffect } from 'react';
import './HealthBar.css';

const HealthBar = () => {
  const [health, setHealth] = useState(100);
  const [healthLevel, setHealthLevel] = useState('green');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHealth((prevHealth) => {
        const newHealth = Math.max(prevHealth - 1, 0);

        if (newHealth >= 66) {
          setHealthLevel('green');
        } else if (newHealth >= 33 && newHealth < 66) {
          setHealthLevel('yellow');
        } else {
          setHealthLevel('red');
        }

        return newHealth;
      });
    }, 100); // Decrease health by 1% every 100 milliseconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="health-bar">
      <div className="health-fill" style={{ width: `${health}%`, backgroundColor: healthLevel }}></div>
    </div>
  );
};

export default HealthBar;
