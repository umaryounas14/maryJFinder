import {
  combineReducers,
  configureStore,
  createReducer,
} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import signUpReducer from './slices/signUpSlice';
import loginReducer from './slices/loginSlice'
import userReducer  from './slices/userInfoSlice'
import otpReducer from './slices/OtpVerifySlice'
import businessSignUpReducer from './slices/BusinessSignUpSlice'
import chatReducer from './slices/chatSlice'
import googleLoginReducer from './slices/googleLoginSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import analyticsReducer from './slices/analyticsSlice';
import cartReducer from './slices/cartSlice';
const rootReducer = combineReducers({
    signUp: signUpReducer,
    login: loginReducer,
    user: userReducer,
    otp: otpReducer,
    businessAccount: businessSignUpReducer,
    chat: chatReducer,
    google: googleLoginReducer,
    analytics: analyticsReducer,
    cart:cartReducer
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
