import { deckOfCards, participants } from "./cardConstants";
import {
  GameActions,
  SET_DEALER_DECK,
  SET_HANDS,
  SET_TURN,
  START_GAME,
} from "./gameActions";
import { Card, CurrentCard } from "./Table";

export type GameState = {
  isGameStarted: boolean;
  dealerDeck: Card[];
  turn: string;
  hands: { [key: string]: CurrentCard[] };
};

export const initialState: GameState = {
  isGameStarted: false,
  dealerDeck: deckOfCards,
  turn: participants.PLAYER_1,
  hands: {
    [participants.PLAYER_1]: [],
    [participants.DEALER]: [],
  },
};

export function gameReducer(state: GameState, action: GameActions): GameState {
  const { type, payload } = action;
  switch (type) {
    case SET_TURN:
      console.log(payload);
      return {
        ...state,
        turn: payload,
      };
    case START_GAME:
      return {
        ...state,
        isGameStarted: payload,
      };
    case SET_HANDS:
      return {
        ...state,
        hands: {
          ...state.hands,
          [payload.participant]: [
            ...state.hands[payload.participant],
            state.dealerDeck[payload.cardIndex],
          ],
        },
      };
    case SET_DEALER_DECK:
      return {
        ...state,
        dealerDeck: state.dealerDeck.filter((_, index) => index !== payload),
      };

    default:
      return state;
  }
}
