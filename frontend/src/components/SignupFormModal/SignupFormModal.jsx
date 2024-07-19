import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { signup } from "../../store/session";
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
  const [serverErrors, setServerErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {
    const validateErrors = {};
    const emailRegExp = new RegExp(
      "^[a-zA-Z0-9._%±]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
    );
    //empty fields are caught by the browser, not checked here
    //not checking first and last names because what do we check against
    //their names for other than they have names
    if (email.length && !emailRegExp.test(email)) {
      validateErrors.email = "Please provide a valid email";
    }
    if (username.length && username.length < 4)
      validateErrors.username = "Username too short";
    if (password.length && password.length < 8)
      validateErrors.password =
        "Please provide a password 8 characters or longer";

    if (confirmPassword.length && confirmPassword !== password)
      validateErrors.confirmPassword = "Please enter the same password again";

    setErrors(validateErrors);
  }, [email, username, password, confirmPassword]);
  useEffect(() => {
    //triggered by state changes to set errors to server response
    if (session.errors) setServerErrors(session.errors);
  }, [session]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length) {
      return window.alert("Please fix your register form before submitting.");
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
        <div>
          {serverErrors.email && <p className="errors">{serverErrors.email}</p>}
          {serverErrors.username && (
            <p className="errors">{serverErrors.username}</p>
          )}
          {serverErrors.firstName && (
            <p className="errors">{serverErrors.firstName}</p>
          )}
          {serverErrors.lastName && (
            <p className="errors">{serverErrors.lastName}</p>
          )}
          {serverErrors.password && (
            <p className="errors">{serverErrors.password}</p>
          )}
          {serverErrors.confirmPassword && (
            <p className="errors">{serverErrors.confirmPassword}</p>
          )}
        </div>
        <div id="login-modal-input-fields">
          <div className="form-group">
            {" "}
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className={errors.email ? "errors" : ""}>
              {errors.email || "email"}
            </label>
          </div>
          <div className="form-group">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label className={errors.username ? "errors" : ""}>
              {errors.username || "username"}
            </label>
          </div>
          <div className="form-group">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <label>your first name</label>
          </div>
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
          <div className="form-group">
            {" "}
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label className={errors.password ? "errors" : ""}>
              {errors.password || "password"}
            </label>
          </div>
          <div className="form-group">
            {" "}
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <label className={errors.confirmPassword ? "errors" : ""}>
              {errors.confirmPassword || "confirm password"}
            </label>
          </div>
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
