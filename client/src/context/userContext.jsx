import PropTypes from "prop-types";
import { createContext, useContext, useMemo } from "react";
import UseLocalStorage from "../UselocalStorage";

const UserContext = createContext();

/**
 * The useMemo hook is used to memoize the value returned by the callback function.
 * It will only recompute the memoized value when one of the dependencies has changed.
 * In this case, the memoized value is an object containing the user data, the setUser function, and the login function.
 * The user data is stored in local storage and context, and the setUser function is used to update the user data.
 * The login function is used to log the user in by storing their data in local storage and context.
 */
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
