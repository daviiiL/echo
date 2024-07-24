import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import store from "../../store";
import { login } from "../../store/session";
import { fetchCurrentUserArticles } from "../../services/articleThunks";
import { fetchCurrentUserComments } from "../../store/comment";
import { Box, TextField, Typography } from "@mui/material";
function LoginFormModal() {
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setShowError(false);
  }, [credential, password]);

  useEffect(() => {
    const errors = {};
    if (credential.length < 3) errors.credential = "Invalid username";
    if (password.length < 6) errors.password = "password too short";
    setErrors(errors);
  }, [credential, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errors.credential || errors.password) return setShowError(true);
    setErrors({});
    const actionResult = await store.dispatch(login({ credential, password }));

    if (actionResult.error) {
      setErrors({ apiError: "Invalid Credentials" });
      setShowError(true);
    } else {
      store.dispatch(fetchCurrentUserComments());
      store.dispatch(fetchCurrentUserArticles()).then(closeModal);
    }
  };

  const fillDemo = () => {
    setCredential("Demo-lition");
    setPassword("password");
  };

  return (
    <Box
      component="form"
      autoComplete="off"
      height={"fit-content"}
      width={400}
      p={3}
      display={"flex"}
      flexDirection={"column"}
      bgcolor={"background.main"}
      borderRadius={2}
      sx={{
        "& .MuiTextField-root": { m: 1, width: "95%" },
      }}
    >
      <Typography mb={2} id="login-title">
        welcome back
      </Typography>
      <div>
        <TextField
          variant="outlined"
          label="username or email"
          required
          value={credential}
          error={showError}
          helperText={(showError && errors.credential) || " "}
          onChange={(e) => setCredential(e.target.value)}
        />
        <TextField
          variant="outlined"
          label="password"
          required
          type="password"
          value={password}
          error={showError}
          helperText={
            (showError && (errors.password || errors.apiError)) || " "
          }
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Box display={"flex"} justifyContent={"flex-end"} columnGap={1} mr={1.2}>
        <Button variant="outlined" onClick={fillDemo}>
          Demo
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!credential.length || !password.length}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}

export default LoginFormModal;
