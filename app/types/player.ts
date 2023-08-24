type ObjectId = string; // This represents Mongoose's ObjectId type. In practice, you might have a specific type for this from Mongoose.

type TeamHistory = {
  team_id: ObjectId;
  date_joined: Date;
  date_left?: Date;
};

type PlayerAccount = {
  platform: string;
  platform_id: string;
};

type Player = {
  _id?: ObjectId;        // I'm assuming the _id field would exist for the Player document. 
  discord_id?: string;   // Made this optional because of the "sparse: true" in the schema
  team_history: TeamHistory[];
  email?: string;
  avatar?: string;
  screen_name?: string;
  accounts: PlayerAccount[];
  permissions: string[];
  discord_linked?: Date;
  // Assuming 'teams' is not part of the saved document but rather a virtual, so not included here.
};

export default Player;