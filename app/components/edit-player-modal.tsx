import { useState, useEffect } from 'react';
import Player from '@/app/types/player'
import ModelEditForm from './model-edit-form';

type EditPlayerModalProps = {
  player: Player;
  schema: any;
  onClose: () => void;
  onSubmit: (updatedPlayer: Player) => void;
};

const EditPlayerModal: React.FC<EditPlayerModalProps> = ({ player,schema, onClose, onSubmit }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-3/4 h-3/4 overflow-y-auto relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200">
          X
        </button>
        <div className="p-4 mt-4">
        <h1 className="text-lg">Edit player: {player.screen_name}</h1>
        <ModelEditForm playerSchema={schema} playerData={player} onSubmit={onSubmit}/>
        </div>
      </div>
    </div>
  );
};

export default EditPlayerModal;