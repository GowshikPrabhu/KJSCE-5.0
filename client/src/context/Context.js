import React, { useReducer, createContext } from "react";
export const Context = createContext();

const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Global State
const initialState = {
  user: {},
  isLoaderVisible: false,
  speedometerValue: randomInteger(89, 99),
  changedFieldName: "",
  changedFieldValue: 0,
  changedFieldType: "inc",
  changedPercentage: 0,
  additionalData: {
    temp: 0,
    heatIndex: 0,
    waveHeight: 0,
    waveDuration: 0,
    waterTemp: 0,
    precipitation: 0,
    cloudcover: 0,
    pressure: 0,
    humidity: 0,
    visibility: 0,
  },
};

// Reducers
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      console.log(action.payload);

      return {
        ...state,
        user: action.payload,
      };
    case "SET_LOADER":
      return {
        ...state,
        isLoaderVisible: action.payload,
      };
    case "SPEEDOMETER":
      console.log(action.payload);
      return {
        ...state,
        changedPercentage: action.payload.val + randomInteger(0, 10),
        changedFieldType: action.payload.type === "danger" ? "dec" : "inc",
        speedometerValue:
          action.payload.type === "danger"
            ? Math.abs(action.payload.val - state.speedometerValue)
            : action.payload.val + state.speedometerValue,
        additionalData: {
          ...state.additionalData,
          [action.payload.fieldKey]: action.payload.fieldValue,
        },
        changedFieldName: action.payload.fieldKey,
        changedFieldValue: action.payload.val - randomInteger(10, 20),
      };
    default:
      throw new Error();
  }
};

// Context Provider
export const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={[state, dispatch]}>
      {props.children}
    </Context.Provider>
  );
};
