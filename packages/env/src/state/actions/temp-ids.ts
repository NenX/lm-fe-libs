import { Dispatch } from 'redux';
import { ACTION_TYPE } from '../actionType';

export const updateWomenExamRecordsEditingId = (womenExamRecordsEditingId: any) => (dispatch: Dispatch) => {
  dispatch({
    type: ACTION_TYPE.CHANGE_WOMEN_EXAM_RECORD_EDITING_ID,
    payload: {
      data: {
        womenExamRecordsEditingId,
      },
    },
  });
};
