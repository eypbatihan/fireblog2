import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Stack, Paper, CardMedia } from "@mui/material";

import { getDatabase, ref, update, push, child } from "firebase/database";
import { database } from "../helpers/firebase";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { successNote } from "../helpers/toastNotify";

const UpdateBlog = () => {
  const { cardsArray } = React.useContext(AuthContext);
  const { user } = React.useContext(AuthContext);
  const { cardId } = useParams();
  const [title, setTitle] = useState();
  const [url, setUrl] = useState();
  const [content, setContent] = useState();
  const date = new Date().toDateString();
  const navigate = useNavigate();

  const blog = () => {
    updateblog(title, url, content, user, date, cardId);
    successNote("Successfully Updated");
    navigate("/");
  };
  const updateblog = () => {
    const db = getDatabase();
    const postData = {
      title: title,
      url: url,
      content: content,
      user: user,
      date: date,
    };
    const updates = {};
    updates["/card/" + cardId] = postData;
    return update(ref(db), updates);
  };

  return (
    <div>
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
          {cardsArray.map((card) =>
            card.id === cardId ? (
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
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image={url ? url : card.url}
                />
                <Typography
                  variant="body1"
                  style={{
                    color: "#046582",
                    fontFamily: "Girassol",
                    fontWeight: 800,
                  }}
                >
                  <h1> ─── Update ───</h1>
                </Typography>

                <Stack spacing={2} width={350}>
                  <TextField
                    id="outlined-title"
                    label="Title *"
                    type="text"
                    value={title ? title : setTitle(card.title)}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <TextField
                    id="outlined-url"
                    label="Image URL *"
                    type="text"
                    value={url ? url : setUrl(card.url)}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                  <TextField
                    id="outlined-content"
                    label="Content *"
                    multiline
                    minRows={10}
                    value={content ? content : setContent(card.content)}
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
                    UPDATE
                  </Button>
                </Stack>
              </Stack>
            ) : null
          )}
        </Stack>
      </Paper>
    </div>
  );
};

export default UpdateBlog;
