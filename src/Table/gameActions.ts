export const SET_TURN = "SET_TURN";
export const START_GAME = "START_GAME";
export const SET_HANDS = "SET_HANDS";
export const SET_DEALER_DECK = "SET_DEALER_DECK";

export const setTurn = (payload: string) => ({
  type: SET_TURN,
  payload,
});

export const startGame = (payload: boolean) => ({
  type: START_GAME,
  payload,
});

export const setHands = (payload: {
  participant: string;
  cardIndex: number;
}) => ({
  type: SET_HANDS,
  payload,
});

export const setDealerDeck = (payload: number) => ({
  type: SET_DEALER_DECK,
  payload,
});

export type GameActions = {
  type: string;
  payload?: any;
};
