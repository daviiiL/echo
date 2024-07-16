import { useState } from "react";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import store from "../../store";
import { login } from "../../store/toolkitSession";
import { fetchCurrentUserArticles } from "../../services/articleService";
import { fetchCurrentUserComments } from "../../store/toolkitComment";
function LoginFormModal() {
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const actionResult = await store.dispatch(login({ credential, password }));
    if (actionResult.error) setErrors({ credential: "Invalid Credentials" });
    else {
      store.dispatch(fetchCurrentUserComments());
      store.dispatch(fetchCurrentUserArticles()).then(closeModal);
    }
  };

  const fillDemo = () => {
    setCredential("Demo-lition");
    setPassword("password");
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && (
          <p className="server-error">{errors.credential}</p>
        )}
        <button type="submit">Log In</button>
        <button onClick={fillDemo}>Login Demo</button>
      </form>
    </>
  );
}

export default LoginFormModal;
