export const mocks = {
  registerResponse: {
    data: {
      token: "123123123",
    },
    error: null,
  },
  loginResponse: {
    data: {
      token: "123123123",
    },
    error: null,
  },
  user: {
    data: {
      id: 1,
      username: "puker228",
      name: "Puker",
      preferences: "plus vibes",
      completed_events: {
        storytelling_viewed: true,
        gift_sent: false,
      },
    },
    error: null,
  },
  userLobbies: {
    data: [
      {
        lobby_code: "ABCDEF",
        lobby_name: "NEW YEAR",
        is_started: false,
      },
      {
        lobby_code: "MNBBVC",
        lobby_name: "BIRTHDAY",
        is_started: false,
      },
      {
        lobby_code: "YHNUJM",
        lobby_name: "CHRISTMAS",
        is_started: false,
      },
    ],
    error: null,
  },
  newLobby: {
    data: {
      lobby_id: "RFVTGB",
    },
    error: null,
  },
  lobby: {
    data: {
      lobby_id: "1",
      lobby_name: "VBNGHJ",
      participants: [
        {
          id: 1,
          username: "keker",
          name: "Keker",
        },
        {
          id: 2,
          username: "pooker",
          name: "Pooker",
        },
      ],
      is_started: false,
      is_admin: false,
    },
    error: null,
  },
  joinLobby: {
    message: "Successfully joined the lobby",
  },
  startGameResponse: {
    santa_for_user: {
      username: "pook pook",
      wishlist: "burgir",
    },
  },
  saveEventResponse: {
    data: null,
    error: null,
  },
  events: {
    data: {
      completed_events: {
        storytelling_viewed: true,
        gift_sent: false,
      },
    },
    error: null,
  },
};
