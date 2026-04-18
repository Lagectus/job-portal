import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import jobSlice from "./jobslice";
import jobReducer from "./jobslice";
import storage from "redux-persist/lib/storage";
import companySlice from "./comapnySlice";
import {
  persistStore,
  persistReducer,
  createTransform,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { applicationSliceReducer } from "./applications";

// ✅ Resets loading to false on every page refresh/rehydration
const resetLoadingTransform = createTransform(
  (inboundState) => inboundState,
  (outboundState) => ({ ...outboundState, loading: false }),
  { whitelist: ["auth"] }
);

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  transforms: [resetLoadingTransform], // ✅ added
};

const rootReducer = combineReducers({
  auth: authReducer,
  job: jobSlice,
  jobs: jobReducer,
  company: companySlice,
  application: applicationSliceReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;