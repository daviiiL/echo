import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import store from "../../store";

import { Box, Button, TextField, Typography } from "@mui/material";
import { signup } from "../../store/session";

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
      "^[a-zA-Z0-9._%±]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
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
    <Box
      width={500}
      height={"fit-content"}
      p={2}
      component="form"
      autoComplete="off"
      display={"flex"}
      flexDirection={"column"}
      rowGap={1}
      bgcolor={"background.main"}
      borderRadius={2}
      sx={{
        "& .MuiTextField-root": { alignSelf: "center", m: 1, width: "95%" },
      }}
    >
      <Typography id="login-title">{`let's get started`}</Typography>

      <Box display={"flex"} flexDirection={"column"}>
        <TextField
          variant="outlined"
          label="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          size="small"
          color={errors.email ? "error" : "primary"}
          error={!!errors.email || !!serverErrors.email}
          helperText={errors.email || serverErrors.email || " "}
        />

        <TextField
          variant="outlined"
          label="username"
          value={username}
          size="small"
          onChange={(e) => setUsername(e.target.value)}
          color={errors.username ? "error" : "primary"}
          error={!!errors.username || !!serverErrors.username}
          helperText={errors.username || serverErrors.username || " "}
          required
        />

        <TextField
          variant="outlined"
          label="first name"
          value={firstName}
          size="small"
          onChange={(e) => setFirstName(e.target.value)}
          required
          error={!!errors.firstName || !!serverErrors.firstName}
          helperText={errors.firstName || serverErrors.firstName || " "}
          color={errors.firstName ? "error" : "primary"}
        />
        <TextField
          variant="outlined"
          label="last name"
          value={lastName}
          size="small"
          onChange={(e) => setLastName(e.target.value)}
          required
          error={!!errors.lastName || !!serverErrors.lastName}
          helperText={errors.lastName || serverErrors.lastName || " "}
          color={errors.lastName ? "error" : "primary"}
        />
        <TextField
          variant="outlined"
          label="password"
          value={password}
          size="small"
          onChange={(e) => setPassword(e.target.value)}
          required
          error={!!errors.password || !!serverErrors.password}
          helperText={errors.password || serverErrors.password || " "}
          color={errors.password ? "error" : "primary"}
          type="password"
        />
        <TextField
          variant="outlined"
          label="confirm password"
          value={confirmPassword}
          size="small"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          error={!!errors.confirmPassword || !!serverErrors.confirmPassword}
          helperText={
            errors.confirmPassword || serverErrors.confirmPassword || " "
          }
          color={errors.confirmPassword ? "error" : "primary"}
          type="password"
        />
      </Box>
      <div id="login-modal-buttons">
        <Button variant="outlined" onClick={fillFrom}>
          Demo Info
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Sign Up
        </Button>
      </div>
    </Box>
  );
}

export default SignupFormModal;
