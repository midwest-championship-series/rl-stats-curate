import ImageWithFallback from '@/app/components/image-with-fallback'
import 'tailwindcss/tailwind.css';

type PlayerCardProps = {
    player: {
      screen_name: string;
      email?: string;
      avatar?: string;
    };
    onClick: () => void;
  };
  
  const PlayerCard: React.FC<PlayerCardProps> = ({ player, onClick }) => {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 m-2 w-64 cursor-pointer" onClick={onClick}>
        <div className="relative w-32 h-32 mx-auto">
            <ImageWithFallback
              src={player.avatar}
              alt="Player Avatar"
              layout="responsive"
              width={128}
              height={128}
              className="rounded-full"
              fallbackSrc="/images/default-avatar.png"
            />
        </div>
  
        <h2 className="text-xl font-bold mt-4 text-center">{player.screen_name}</h2>
  
        {player.email && (
          <p className="text-sm text-gray-600 mt-2 text-center">{player.email}</p>
        )}
      </div>
    );
};
  
  export default PlayerCard;