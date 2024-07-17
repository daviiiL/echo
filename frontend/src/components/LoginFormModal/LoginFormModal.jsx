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
    <div id="login-form-modal">
      <form onSubmit={handleSubmit}>
        <p id="login-title">welcome back</p>
        <div id="login-modal-input-fields">
          <input
            type="text"
            value={credential}
            placeholder="username or email"
            onChange={(e) => setCredential(e.target.value)}
            required
          />

          <input
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errors.credential && <p className="errors">{errors.credential}</p>}
        <div id="login-modal-buttons">
          <button id="login-demo" onClick={fillDemo}>
            Demo
          </button>
          <button id="login-button" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
