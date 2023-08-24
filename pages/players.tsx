import React, { useState, useEffect } from 'react';
import api from '../app/services/rl-stats';
import PlayerCard from '@/app/components/player-card';
import EditPlayerModal from '@/app/components/edit-player-modal';
import Player from '@/app/types/player';

const AdminPlayers = () => {
  const [players, setPlayers] = useState<any[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const [schema, setSchema] = useState<any>(null)

  useEffect(() => {
    async function fetchPlayers() {
      const fetchedPlayers = await api.get('players', {sort: 'screen_name'});
      setPlayers(fetchedPlayers);
    }

    fetchPlayers();
  }, []);

  useEffect(() => {
    async function fetchSchema() {
      const modelSchema = await api.get('players/_schema')
      setSchema(modelSchema)
    }
    fetchSchema()
  }, [])

  const handleEdit = (player: Player) => {
    document.body.style.overflow = 'hidden'
    setSelectedPlayer(player);
  };

  const handleCloseModal = () => {
    document.body.style.overflow = 'auto'
    setSelectedPlayer(null);
  };

  const handleUpdatePlayer = (updatedPlayer: Player) => {
    async function sendPlayerUpdate(data: Player) {
      try {
        await api.put(`players/${data._id}`, data)
        const newPlayers = players.map(player => 
          player._id === data._id ? data : player
        );
        setPlayers(newPlayers);
      } catch (err) {
        console.error(err)
      }
    }
    sendPlayerUpdate(updatedPlayer)
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
        <EditPlayerModal player={selectedPlayer} schema={schema} onClose={handleCloseModal} onSubmit={handleUpdatePlayer} />
      )}
    </div>
  );
}

export default AdminPlayers;
