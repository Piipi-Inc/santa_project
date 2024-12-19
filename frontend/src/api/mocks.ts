export const mocks = {
  registerResponse: {
    token: "123123123",
  },
  loginResponse: {
    token: "123123123",
  },
  user: {
    id: "0817cb1e-61fa-4425-a2bc-7fee2268b81c",
    username: "puker228",
    name: "Puker",
    preferences: "plus vibes",
    completed_events: ["storytelling"],
  },
  userLobbies: [
    {
      lobby_code: "ABCDEF",
      lobby_name: "NEW YEAR",
      participants_count: 2,
      is_started: false,
    },
    {
      lobby_code: "MNBBVC",
      lobby_name: "BIRTHDAY",
      participants_count: 3,
      is_started: true,
    },
    {
      lobby_code: "YHNUJM",
      lobby_name: "CHRISTMAS",
      participants_count: 5,
      is_started: false,
    },
  ],
  newLobby: {
    lobby_code: "RFVTGB",
    lobby_name: "Pukakapisi",
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
      {
        id: "5bdcb073-7eb0-420d-b1d2-dasdasdasd",
        username: "chill_guy",
        name: "chill guy",
      },
      {
        id: "5bdcb073-7eb0-420d-b1d2-rwerwerwerwer3ers",
        username: "nagibator228",
        name: "Vovka)",
      },
    ],
    is_started: false,
    admin_username: "puker228",
  },
  getGiftResponse: {
    username: "pook pook",
    name: "kakapisya",
    preferences: "burgir",
  },
};
