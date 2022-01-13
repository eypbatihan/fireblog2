import { onAuthStateChanged } from "firebase/auth";
import { getDatabase, onValue, query, ref } from "firebase/database";
import { createContext, useEffect, useState } from "react";
import { auth } from "../helpers/firebase";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState();
  const [cardsArray, setCardsArray] = useState([]);
  const [user, setUser] = useState([]);
  const [name, setName] = useState([]);
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
      setUser(currentUser.email);
      setName(currentUser.displayName);
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const db = getDatabase();

    const useRef = ref(db, "card");

    onValue(query(useRef), (snapShot) => {
      const cards = snapShot.val();
      const array = [];

      for (let id in cards) {
        array.push({ id, ...cards[id] });
      }
      setCardsArray(array);
      setIsLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, cardsArray, user, name, isLoading }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
