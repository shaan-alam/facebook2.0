import {
  AUTH,
  GOOGLE_AUTH_SUCCESS,
  GOOGLE_AUTH_FAILURE,
  LOGOUT,
} from "../constants";

interface Action {
  type: string;
  payload: {
    user: {
      _id: string;
      fullName: string;
      email: string;
      imageURL: string;
      createdAt: string;
      updatedAt: string;
    };
    token: string;
  };
}

interface InitialStateInterface {
  authData: {
    token: string;
    user: {
      _id: string;
      fullName: string;
      email: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}

const initialState: InitialStateInterface = {
  authData: {
    token: "",
    user: {
      _id: "",
      fullName: "",
      email: "",
      createdAt: "",
      updatedAt: "",
    },
  },
};

const auth = (state = initialState, action: Action) => {
  switch (action.type) {
    case AUTH:
    case GOOGLE_AUTH_SUCCESS:
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));

      return {
        ...state,
        authData: {
          ...action.payload,
        },
      };

    case LOGOUT:
    case GOOGLE_AUTH_FAILURE:
      localStorage.clear();
      return {
        ...state,
        authData: {
          token: "",
          user: {
            _id: "",
            fullName: "",
            email: "",
            createdAt: "",
            updatedAt: "",
            imageURL: "",
          },
        },
      };

    default:
      return state;
  }
};

export default auth;
