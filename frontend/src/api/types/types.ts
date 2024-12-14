export type RegisterPayload = {
  username: string;
  name: string;
  preferences: string;
  password: string;
};

export type LoginPayload = {
  username: string;
  password: string;
};

export type PatchUserPayload = {
  name?: string;
  preferences?: string;
};

export type CreateLobbyPayload = {
  lobby_name: string;
};

export type JoinLobbyPayload = {
  lobby_id: string;
};

export type UserLobby = {
  lobby_code: string;
  lobby_name: string;
  participants_count: number;
  is_started: boolean;
};
