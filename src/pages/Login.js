import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import blok from "../assests/blok.png";
import Typography from "@mui/material/Typography";
import { Paper, Stack, Link } from "@mui/material";
import GoogleButton from "react-google-button";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../helpers/firebase";
import { useNavigate } from "react-router-dom";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { successNote } from "../helpers/toastNotify";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async () => {
    try {
      let user = await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      successNote("Successfully Login ");
    } catch (err) {
      alert(err.message);
    }
  };
  const login = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        navigate("/");
        successNote("Successfully Login ");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Paper
      elevation={0}
      style={{
        background: `url(https://picsum.photos/800/800)`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Stack
        marginTop={5}
        paddingBottom={3}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          marginTop={8}
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          padding={4}
          width={400}
          bgcolor="white"
          borderRadius={3}
          boxShadow="10px 5px 5px #333332 "
        >
          <Avatar
            sx={{
              bgcolor: "#046582",
              width: 220,
              height: 220,
            }}
          >
            <img style={{ width: "220px" }} src={blok} alt="blok image" />
          </Avatar>
          <Typography
            component={"span"}
            variant="body1"
            style={{
              color: "#046582",
              fontFamily: "Girassol",
              fontWeight: 800,
            }}
          >
            <h1>─── Login ───</h1>
          </Typography>

          <Stack spacing={2} width={350}>
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              required
              id="outlined-email"
              label="Email"
              type="mail"
            />
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              id="outlined-password"
              label="Password"
              type="password"
              required
            />

            <Button
              sx={{
                bgcolor: "#046582",
                ":hover": { bgcolor: "#D5D5D5", color: "#046582" },
              }}
              variant="contained"
              onClick={handleSubmit}
            >
              LOGİN
            </Button>

            <GoogleButton
              style={{
                width: "100%",
              }}
              type="light"
              onClick={login}
            />

            <Typography component={"span"} variant="body1">
              <p>
                I don't have an account.
                <Link
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/register")}
                >
                  Register
                </Link>
              </p>
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Login;
