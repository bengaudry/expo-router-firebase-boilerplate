import { getApps, initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  Auth,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCmoc2qszSbV_kCD6fbJxieNSks729p-jY",
  authDomain: "trips-5bb9a.firebaseapp.com",
  databaseURL:
    "https://trips-5bb9a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "trips-5bb9a",
  storageBucket: "trips-5bb9a.appspot.com",
  messagingSenderId: "396597471240",
  appId: "1:396597471240:web:b816bf0f55a2cbe403c9bd",
  measurementId: "G-J246X22GKK",
};

export function getFirebaseApp() {
  const apps = getApps();
  return apps.length > 0 ? apps[0] : initializeApp(firebaseConfig);
}

// AUTH
const AUTH = initializeAuth(getFirebaseApp(), {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const getFirebaseAuth = (): Auth => AUTH;
