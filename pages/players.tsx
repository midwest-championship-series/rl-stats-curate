import React, { useState, useEffect } from 'react';
import api from '../app/services/rl-stats';
import PlayerCard from '@/app/components/player-card';

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
      <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Players</h1>
      <div className="flex flex-wrap -m-2">
        {players.map((player) => (
          <PlayerCard key={player._id} player={player} />
        ))}
      </div>
    </div>
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
