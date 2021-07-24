interface Action {
  type: string;
  payload: {
    profileObj: { _id: string; name: string; email: string };
    tokenId: string;
  };
}

interface InitialStateInterface {
  authData: {
    tokenId: string;
    profileObj: {
      _id: string;
      name: string;
      email: string;
    };
  };
}

const initialState: InitialStateInterface = {
  authData: {
    tokenId: "",
    profileObj: {
      _id: "",
      name: "",
      email: "",
    },
  },
};

const auth = (state = initialState, action: Action) => {
  switch (action.type) {
    case "AUTH":
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));

      return {
        ...state,
        authData: {
          ...action.payload,
        },
      };

    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        authData: {
          tokenId: "",
          profileObj: {
            _id: "",
            name: "",
            email: "",
          },
        },
      };

    case "GOOGLE_SIGNUP":
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));

      return {
        ...state,
        authData: {
          tokenId: action.payload.tokenId,
          profileObj: {
            _id: action.payload.profileObj._id,
            name: action.payload.profileObj.name,
            email: action.payload.profileObj.email,
          },
        },
      };

    case "GOOGLE_SIGNIN":
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));

      return {
        ...state,
        authData: {
          tokenId: action.payload.tokenId,
          profileObj: {
            _id: action.payload.profileObj._id,
            name: action.payload.profileObj.name,
            email: action.payload.profileObj.email,
          },
        },
      };

    default:
      return state;
  }
};

export default auth;
