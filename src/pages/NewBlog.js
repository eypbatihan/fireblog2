import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import blok from "../assests/blok.png";
import Typography from "@mui/material/Typography";
import { Stack, Paper } from "@mui/material";

import { getDatabase, ref, set, push } from "firebase/database";
import { database } from "../helpers/firebase";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { successNote } from "../helpers/toastNotify";

const NewBlog = () => {
  const { user } = React.useContext(AuthContext);
  const [title, setTitle] = useState();
  const [url, setUrl] = useState();
  const [content, setContent] = useState();
  const date = new Date().toDateString();

  const navigate = useNavigate();

  const blog = () => {
    newblog(title, url, content, user, date);
  };

  const newblog = () => {
    const db = getDatabase();
    const userRef = ref(db, "card");
    const newUserRef = push(userRef);
    set(newUserRef, {
      title: title,
      url: url,
      content: content,
      user: user,
      date: date,
    });
    successNote("Successfully Added ");
    setTitle("");
    navigate("/");
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
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Stack
          marginTop={12}
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
            <h1> ─── New Blog ───</h1>
          </Typography>

          <Stack spacing={2} width={350}>
            <TextField
              id="outlined-title"
              label="Title *"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              id="outlined-url"
              label="Image URL *"
              type="text"
              onChange={(e) => setUrl(e.target.value)}
            />
            <TextField
              id="outlined-content"
              label="Content *"
              multiline
              minRows={10}
              onChange={(e) => setContent(e.target.value)}
            />
            <Button
              sx={{
                minWidth: 350,
                ":hover": { bgcolor: "#D5D5D5", color: "#046582" },
              }}
              variant="contained"
              onClick={blog}
            >
              SUBMIT
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default NewBlog;
