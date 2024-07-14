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
    else console.log("registered");
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
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p>{errors.firstName}</p>}
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p>{errors.lastName}</p>}
        <label>
          Password
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>
          Confirm Password
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button type="submit">Sign Up</button>
        <button type="button" onClick={fillFrom}>
          Autofill Demo
        </button>
      </form>
    </>
  );
}

export default SignupFormModal;
