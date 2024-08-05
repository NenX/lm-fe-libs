import { Dispatch } from 'redux';
import { ACTION_TYPE } from '../actionType';

export const updateTabs = (tab: any) => (dispatch: Dispatch) => {
  dispatch({
    type: ACTION_TYPE.ADD_TAB,
    payload: {
      data: tab,
    },
  });
};

export const deleteTab = (key: string) => (dispatch: Dispatch) => {
  dispatch({
    type: ACTION_TYPE.DELETE_TAB,
    payload: {
      data: { key },
    },
  });
};

export const deleteAllTabs = () => (dispatch: Dispatch) => {
  dispatch({
    type: ACTION_TYPE.DELETE_ALL_TAB,
    payload: {},
  });
};

export const deleteRightTabsByKey = (key: string) => (dispatch: Dispatch) => {
  dispatch({
    type: ACTION_TYPE.DELETE_RIGHT_TAB,
    payload: {
      data: { key },
    },
  });
};

export const deleteOtherTabsByKey = (key: string) => (dispatch: Dispatch) => {
  dispatch({
    type: ACTION_TYPE.DELETE_OTHERS_TAB,
    payload: {
      data: { key },
    },
  });
};
