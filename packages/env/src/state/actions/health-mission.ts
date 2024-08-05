import { Dispatch } from 'redux';
import { ACTION_TYPE } from '../actionType';
import { request } from '@lm_fe/utils';


export const updateTab = (key: string) => (dispatch: Dispatch) => {
  dispatch({
    type: ACTION_TYPE.UPDATE_ACTIVE_KEY,
    payload: {
      activeKey: key,
    },
  });
};

export const updateArticleType = (key: string) => (dispatch: Dispatch) => {
  dispatch({
    type: ACTION_TYPE.UPDATE_ARTICLE_TYPE,
    payload: {
      articleType: key,
    },
  });
};

export const updateArticleListByPageNumber = (pageSize: number, pageNumber: number) => async (dispatch: Dispatch) => {
  const data = await request.get(`/api/intrapartumTablet/education/knowledge?size=${pageSize}&page=${pageNumber}`);
  dispatch({
    type: ACTION_TYPE.UPDATE_ARTICLE_LIST,
    payload: {
      articleList: data.data,
    },
  });
};

export const updateArticleListByLabelId = (labelId: number, pageSize: number, pageNumber: number) => async (dispatch: Dispatch) => {
  const data = await request.get(
    `/api/intrapartumTablet/education/knowledge?commonLabelId.equals=${labelId}&size=${pageSize}&page=${pageNumber}`,
  );
  dispatch({
    type: ACTION_TYPE.UPDATE_ARTICLE_LIST,
    payload: {
      articleList: data.data,
    },
  });
};

export const updateArticleListBySearch = (searchValue: string) => async (dispatch: Dispatch) => {
  const data = await request.get(`/api/intrapartumTablet/education/knowledge?title.contains=${searchValue}`);
  dispatch({
    type: ACTION_TYPE.UPDATE_ARTICLE_LIST,
    payload: {
      articleList: data.data,
    },
  });
};

export const updateVideoType = (key: string) => (dispatch: Dispatch) => {
  dispatch({
    type: ACTION_TYPE.UPDATE_VIDEO_TYPE,
    payload: {
      videoType: key,
    },
  });
};

export const updateVideoListByPageNumber = (pageSize: number, pageNumber: number) => async (dispatch: Dispatch) => {
  const data = await request.get(
    `/api/intrapartumTablet/education/video?pageSize=${pageSize}&pageNumber=${pageNumber}`,
  );
  dispatch({
    type: ACTION_TYPE.UPDATE_VIDEO_LIST,
    payload: {
      videoList: data.data,
    },
  });
};

export const updateVideoListByLabelId = (labelId: number) => async (dispatch: Dispatch) => {
  const data = await request.get(`/api/intrapartumTablet/education/video?commonLabelId.equals=${labelId}`);
  dispatch({
    type: ACTION_TYPE.UPDATE_VIDEO_LIST,
    payload: {
      videoList: data.data,
    },
  });
};

export const updateVideoListBySearch = (searchValue: string) => async (dispatch: Dispatch) => {
  const data = await request.get(`/api/intrapartumTablet/education/video?title.contains=${searchValue}`);
  dispatch({
    type: ACTION_TYPE.UPDATE_VIDEO_LIST,
    payload: {
      videoList: data.data,
    },
  });
};
