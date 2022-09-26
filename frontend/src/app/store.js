//  REDUX
import { configureStore } from '@reduxjs/toolkit';
// REDUX PERSIST
import storageSession from 'redux-persist/lib/storage/session';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from 'redux-persist';

// REDUX STATE SYNC
import { createStateSyncMiddleware, initStateWithPrevTab } from 'redux-state-sync';

// REDUCER
import authReducer from '../features/auth/authSlice';
import campaignReducer from '../features/campaign/CampaignSlice';
import collectionTypeReducer from '../features/collectionType/collectionTypeSlice';
import linkTypeReducer from '../features/linkType/linkTypeSlice';

// STORE THE USER INFO
const persistConfig = {
  key: 'userInfo',
  storage: storageSession,
}

const persistedReducer = persistReducer(persistConfig, authReducer)
const campaignPersistedReducer = persistReducer({ key: 'campaign', storage: storageSession }, campaignReducer)

const reduxStateSyncConfig = {
  blacklist: [PERSIST, PURGE, REHYDRATE],
};

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    collectionType: collectionTypeReducer,
    linkType: linkTypeReducer,
    campaign: campaignPersistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(createStateSyncMiddleware(reduxStateSyncConfig)),
  devTools: true
});

// init state with other tabs
initStateWithPrevTab(store);

export const persistor = persistStore(store)
