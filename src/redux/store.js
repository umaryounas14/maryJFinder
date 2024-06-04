import {
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import signUpReducer from './slices/signup-slice';
import loginReducer from './slices/login-slice'
import userReducer  from './slices/userInfo-slice'
import AsyncStorage from '@react-native-async-storage/async-storage';

const rootReducer = combineReducers({
    signUp: signUpReducer,
    login: loginReducer,
    user: userReducer
});

const persistConfig = {
  storage: AsyncStorage,
  key: 'root',
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});
const persistor =persistStore(store)
persistor.flush()
export default {store, persistor};
