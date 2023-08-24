import { useState } from 'react';
import Player from '@/app/types/player'

type EditPlayerModalProps = {
  player: Player;
  onClose: () => void;
  onSubmit: (updatedPlayer: Player) => void;
};

const EditPlayerModal: React.FC<EditPlayerModalProps> = ({ player, onClose, onSubmit }) => {
  const [editedPlayer, setEditedPlayer] = useState(player);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedPlayer(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(editedPlayer);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-3/4 h-3/4 overflow-y-auto relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200">
          X
        </button>
        <h1 className="p-4 mt-4 text-lg">Edit player: {player.screen_name}</h1>
        <form onSubmit={handleSubmit} className="p-4 mt-4">
          {/* Here, add input fields for the various properties of the player, 
               using handleChange to update state. */}
          {/* Example input field: */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold" htmlFor="screen_name">Screen Name</label>
            <input
              type="text"
              name="screen_name"
              value={editedPlayer.screen_name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          {/* Add other fields similarly... */}
          
          <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPlayerModal;