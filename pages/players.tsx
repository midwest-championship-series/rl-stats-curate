import React, { useState, useEffect } from 'react';
import api from '../app/services/rl-stats';
import PlayerCard from '@/app/components/player-card';
import EditPlayerModal from '@/app/components/edit-player-modal';
import Player from '@/app/types/player';
import { useSchemas } from '@/app/hooks/use-schemas';

const AdminPlayers = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const schemas = useSchemas(['players', 'teams']);

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const fetchedPlayers = await api.get('players', {sort: 'screen_name'});
        setPlayers(fetchedPlayers);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    }
    fetchPlayers();
  }, []);

  const handleEdit = (player: Player) => {
    document.body.style.overflow = 'hidden';
    setSelectedPlayer(player);
  };

  const handleCloseModal = () => {
    document.body.style.overflow = 'auto';
    setSelectedPlayer(null);
  };

  const handleUpdatePlayer = async (updatedPlayer: Player) => {
    try {
      await api.put(`players/${updatedPlayer._id}`, updatedPlayer);
      const newPlayers = players.map(player => player._id === updatedPlayer._id ? updatedPlayer : player);
      setPlayers(newPlayers);
      setSelectedPlayer(null);
    } catch (err) {
      console.error(err);
    }
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
        <EditPlayerModal player={selectedPlayer} schema={schemas.players} onClose={handleCloseModal} onSubmit={handleUpdatePlayer} />
      )}
    </div>
  );
}

export default AdminPlayers;