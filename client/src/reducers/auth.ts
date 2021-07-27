import { AUTH, GOOGLE_SIGNIN, GOOGLE_SIGNUP, LOGOUT } from "../constants";

interface Action {
  type: string;
  payload: {
    profileObj: { _id: string; name: string; email: string; imageUrl: string };
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
      imageUrl: string;
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
      imageUrl: "",
    },
  },
};

const auth = (state = initialState, action: Action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));

      return {
        ...state,
        authData: {
          ...action.payload,
        },
      };

    case LOGOUT:
      localStorage.clear();
      return {
        ...state,
        authData: {
          tokenId: "",
          profileObj: {
            _id: "",
            name: "",
            email: "",
            imageUrl: "",
          },
        },
      };

    case GOOGLE_SIGNUP:
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));

      return {
        ...state,
        authData: {
          ...action.payload,
        },
      };

    case GOOGLE_SIGNIN:
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));

      return {
        ...state,
        authData: {
          ...action.payload,
        },
      };

    default:
      return state;
  }
};

export default auth;
