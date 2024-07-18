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
          <div className="form-group">
            {" "}
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>email</label>
          </div>
          {errors.email && <p>{errors.email}</p>}
          <div className="form-group">
            {" "}
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>username</label>
          </div>
          {errors.username && <p>{errors.username}</p>}
          <div className="form-group">
            {" "}
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <label>your first name</label>
          </div>
          {errors.firstName && <p>{errors.firstName}</p>}
          <div className="form-group">
            {" "}
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <label>your last name</label>
          </div>
          {errors.lastName && <p>{errors.lastName}</p>}
          <div className="form-group">
            {" "}
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>a memorable password</label>
          </div>
          {errors.password && <p>{errors.password}</p>}
          <div className="form-group">
            {" "}
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <label>confirm password</label>
          </div>
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
