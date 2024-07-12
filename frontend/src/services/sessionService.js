import ProfileButton from "../components/Navigation/ProfileButton";
import { loginSuccess, logoutSuccess } from "../store/toolkitSession";
import { csrfFetch } from "../store/csrf";
import store from "../store";

export const sessionService = {
  async login({ credential, password }) {
    const response = await csrfFetch("/api/session", {
      method: "POST",
      body: JSON.stringify({ credential, password }),
    });
    const user = await response.json();
    store.dispatch(loginSuccess(user));
    return user;
  },

  async logout() {
    const response = await csrfFetch("/api/session", {
      method: "DELETE",
    });
    store.dispatch(logoutSuccess());
    return await response.json();
  },
};
