import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { signup } from "../../store/toolkitSession";
import store from "../../store";
import "./SignupForm.css";

function SignupFormModal() {
  const session = useSelector((state) => state.session);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {
    if (session.errors) setErrors(session.errors);
  }, [session, closeModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    } else {
      setErrors({});
      const payload = {
        email,
        firstName,
        lastName,
        password,
        username,
      };
      store.dispatch(signup(payload)).then((res) => {
        if (!res.error) closeModal();
      });
    }
  };

  const fillFrom = () => {
    setEmail("test@aa.io");
    setUsername("asdf");
    setFirstName("asdf");
    setLastName("asdf");
    setPassword("asdfasdf");
    setConfirmPassword("asdfasdf");
  };

  return (
    <div id="signup-form-modal">
      <form onSubmit={handleSubmit}>
        <p id="login-title">{`let's get started`}</p>
        <div id="login-modal-input-fields">
          <input
            type="text"
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <p>{errors.email}</p>}
          <input
            type="text"
            value={username}
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {errors.username && <p>{errors.username}</p>}
          <input
            type="text"
            value={firstName}
            placeholder="your first name"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          {errors.firstName && <p>{errors.firstName}</p>}
          <input
            type="text"
            value={lastName}
            placeholder="your last name"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          {errors.lastName && <p>{errors.lastName}</p>}
          <input
            value={password}
            placeholder="set a memorable password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <p>{errors.password}</p>}
          <input
            value={confirmPassword}
            placeholder="confirm your password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        </div>
        <div id="login-modal-buttons">
          <button type="submit">Sign Up</button>
          <button type="button" onClick={fillFrom}>
            Autofill Demo
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormModal;
