import { Dispatch } from 'redux';
import { omit } from 'lodash';
import { ACTION_TYPE } from '../actionType';
import { request } from '@lm_fe/utils';

export const openSpin = () => (dispatch: Dispatch) => {
  dispatch({ type: ACTION_TYPE.PRENATAL_DIAGNOSIS_OPEN_SPIN });
};

export const closeSpin = () => (dispatch: Dispatch) => {
  dispatch({ type: ACTION_TYPE.PRENATAL_DIAGNOSIS_CLOSE_SPIN });
};

export const getPatient = (id: string) => async (dispatch: Dispatch) => {
  // openSpin()(dispatch);
  const patient = await request.get(`/api/prenatal-patients/${id}`);
  dispatch({
    type: ACTION_TYPE.PRENATAL_DIAGNOSIS_CHANGE_PATIENT,
    payload: { ...omit(patient.data, ['prenatalDiagnoses', 'pdOperations']) },
  });
  // closeSpin()(dispatch);

  return patient.data;
};

export const getPrenatalDiagnosis = (prenatalPatientId: number | string, id: number | string) => async (
  dispatch: Dispatch,
) => {
  // openSpin()(dispatch);
  const diagnosis = await request.get(
    `/api/prenatal-diagnoses?prenatalPatientId.equals=${prenatalPatientId}&id.equals=${id}&sort=visitDate,desc`,
  );
  // closeSpin()(dispatch);
  return diagnosis.data;
};
