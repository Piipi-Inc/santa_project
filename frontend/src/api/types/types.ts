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
