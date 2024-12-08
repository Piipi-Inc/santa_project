export const mocks = {
  registerResponse: {
    token: "123123123",
  },
  loginResponse: {
    token: "123123123"
  },
  user: {
    id: "0817cb1e-61fa-4425-a2bc-7fee2268b81c",
    username: "puker228",
    name: "Puker",
    preferences: "plus vibes",
    completed_events: [
      "storytelling",
    ],
  },
  userLobbies: [
      {
        lobby_code: "ABCDEF",
        lobby_name: "NEW YEAR",
        is_started: false,
      },
      {
        lobby_code: "MNBBVC",
        lobby_name: "BIRTHDAY",
        is_started: true,
      },
      {
        lobby_code: "YHNUJM",
        lobby_name: "CHRISTMAS",
        is_started: false,
      },
    ],
  newLobby: {
      lobby_code: "RFVTGB",
      lobby_name: "Pukakapisi"
    },
  lobby: {
    lobby_id: "RFVTGB",
    lobby_name: "Pukakapisi",
    participants: [
      {
        id: "0817cb1e-61fa-4425-a2bc-7fee2268b81c",
        username: "keker",
        name: "Keker",
      },
      {
        id: "5bdcb073-7eb0-420d-b1d2-cfd25efc1a0d",
        username: "pooker",
        name: "Pooker",
      },
    ],
    is_started: false,
    is_admin: false,
  },
  getGiftResponse: {
    username: "pook pook",
    name: "kakapisya",
    preferences: "burgir",
  },
};
