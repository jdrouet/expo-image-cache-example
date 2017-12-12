import { FileSystem } from 'expo';
import { put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import md5 from 'js-md5';

import * as ImageCache from '../reducer/image-cache';
import { constants as status } from '../reducer/status';

const folder = `${FileSystem.cacheDirectory}expo-cache-example`;

const getLoading = (state) => state.imageCache.loading;

const fetch = function* ({ payload }) {
  const loading = yield select(getLoading);
  if (loading.includes(payload.uri)) {
    return;
  }
  const output = `${folder}/${payload.filename}`;
  const localFile = yield FileSystem.getInfoAsync(output);
  if (localFile.exists) {
    yield put(ImageCache.actions.success({
      uri: payload.uri,
      local: localFile.uri,
    }));
    return;
  }
  yield put(ImageCache.actions.download(payload.uri));
  const downloaded = yield FileSystem.downloadAsync(payload.uri, output);
  yield put(ImageCache.actions.success({
    uri: payload.uri,
    local: downloaded.uri,
  }));
};

const fetchSaga = function* () {
  yield takeEvery(ImageCache.constants.fetch, fetch);
};

const init = function* () {
  const folderInfo = yield FileSystem.getInfoAsync(folder);
  if (folderInfo.exists) return;
  yield FileSystem.makeDirectoryAsync(folder);
};

const initSaga = function* () {
  yield takeLatest(status.start, init);
};

export default [
  fetchSaga,
  initSaga,
];
