// pages/AdminPlayers.js
import React, { useState, useEffect } from 'react';
import api from '../app/services/rl-stats'; // Adjust the import path to where your API file is located

const AdminPlayers = () => {
  const [players, setPlayers] = useState<any[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);

  useEffect(() => {
    async function fetchPlayers() {
      const fetchedPlayers = await api.get('players');
      setPlayers(fetchedPlayers);
    }

    fetchPlayers();
  }, []);

  const handleEdit = (player) => {
    setSelectedPlayer(player);
  };

  const handleSave = async () => {
    if (selectedPlayer) {
      await api.put(`players/${selectedPlayer._id}`, selectedPlayer);
      setSelectedPlayer(null);
    }
  };

  const handleChange = (field, value) => {
    setSelectedPlayer((prevState: any) => ({ ...prevState, [field]: value }));
  };

  return (
    <div>
      <h1>Admin Players Edit Tool</h1>
      <ul>
        {players.map(player => (
          <li key={player._id}>
            {player.screen_name}
            <button onClick={() => handleEdit(player)}>Edit</button>
          </li>
        ))}
      </ul>
      {selectedPlayer && (
        <div>
          <label>
            Screen Name:
            <input 
              type="text" 
              value={selectedPlayer.screen_name} 
              onChange={e => handleChange('screen_name', e.target.value)}
            />
          </label>
          {/* Similar inputs for other fields like discord_id, email, etc... */}
          <button onClick={handleSave}>Save Changes</button>
        </div>
      )}
    </div>
  );
}

export default AdminPlayers;
