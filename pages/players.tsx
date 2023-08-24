import React, { useState, useEffect } from 'react';
import api from '../app/services/rl-stats';
import PlayerCard from '@/app/components/player-card';
import EditPlayerModal from '@/app/components/edit-player-modal';
import Player from '@/app/types/player';

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

  const handleEdit = (player: Player) => {
    setSelectedPlayer(player);
  };

  const handleCloseModal = () => {
    setSelectedPlayer(null);
  };

  const handleUpdatePlayer = (updatedPlayer: Player) => {
    // Here, you might call an API to update the player in the backend
    // and then refresh your data or update your local state as needed.

    setSelectedPlayer(null);
  };

  return (
    <div>
      <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Players</h1>
      <div className="flex flex-wrap -m-2">
        {players.map((player) => (
          <PlayerCard key={player._id} player={player} onClick={() => handleEdit(player)} />
        ))}
      </div>
    </div>
      {selectedPlayer && (
        <EditPlayerModal player={selectedPlayer} onClose={handleCloseModal} onSubmit={handleUpdatePlayer} />
      )}
    </div>
  );
}

export default AdminPlayers;
