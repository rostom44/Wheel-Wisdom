import PropTypes from "prop-types";
import { createContext, useContext, useMemo } from "react";
import UseLocalStorage from "../UselocalStorage";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = UseLocalStorage("user", null);

  const login = (userData) => {
    setUser(userData); // Store user data in local storage and context
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memo = useMemo(() => ({ user, setUser, login }), [user]);

  return <UserContext.Provider value={memo}>{children}</UserContext.Provider>;
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUserContext = () => useContext(UserContext);
