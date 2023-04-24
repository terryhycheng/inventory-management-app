import { Dispatch, PropsWithChildren, createContext, useReducer } from 'react';

export const ModalContext = createContext<ModalStatus | null>(null);
export const ModalDispatchContext = createContext<Dispatch<Action> | null>(
  null
);

interface Action {
  type: 'ITEM';
  payload: boolean;
}

interface ModalStatus {
  isItemModal: boolean;
}

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const [modalStatus, dispatch] = useReducer(modalReducer, initialModal);
  return (
    <ModalContext.Provider value={modalStatus}>
      <ModalDispatchContext.Provider value={dispatch}>
        {children}
      </ModalDispatchContext.Provider>
    </ModalContext.Provider>
  );
};

const initialModal: ModalStatus = {
  isItemModal: false,
};

const modalReducer = (state: ModalStatus, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case 'ITEM':
      return {
        isItemModal: payload,
      };
    default:
      return state;
  }
};
