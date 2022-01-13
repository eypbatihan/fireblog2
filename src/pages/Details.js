import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { Stack, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FiMessageSquare from "@mui/icons-material/Message";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { getDatabase, remove, ref } from "firebase/database";

const Details = () => {
  const { cardsArray, user } = React.useContext(AuthContext);

  const { cardId } = useParams();
  const navigate = useNavigate();

  const deleteCard = (id) => {
    const db = getDatabase();
    remove(ref(db, "card/" + id));
    navigate("/");
  };

  return (
    <div>
      {cardsArray.map((card) =>
        card.id === cardId ? (
          <Stack
            key={card.id}
            marginTop={4}
            direction="column"
            justifyContent="center"
            alignItems="center"
            width="100%"
          >
            <Stack
              marginTop={5}
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              padding={4}
              width={800}
              bgcolor="white"
              borderRadius={3}
            >
              <Typography
                component={"span"}
                variant="body1"
                style={{
                  color: "#046582",
                  fontFamily: "Girassol",
                  fontWeight: 800,
                }}
              >
                <h1> ─── Details ───</h1>
              </Typography>
              <Card
                sx={{
                  Width: 345,
                  Height: 425,
                  borderBottom: "1px solid gray",
                  cursor: "pointer",
                }}
              >
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="300px"
                  image={card.url}
                />
                <CardContent
                  style={{
                    background: "#D9D9D9",
                    height: "125px",
                    overflow: "hidden",
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    fontFamily="Girassol"
                    color="#046582"
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    component={"div"}
                    variant="body1"
                    color="text.secondary"
                  >
                    {card.date}
                  </Typography>
                  <Typography
                    component={"div"}
                    variant="body2"
                    color="text.secondary"
                  >
                    {card.content}
                  </Typography>
                </CardContent>
                <CardActions>
                  <AccountCircle style={{ marginRight: "0.5rem" }} />
                  <p>{card.user} </p>
                </CardActions>
                <CardActions>
                  <Button size="small">
                    <FavoriteIcon />
                  </Button>
                  <Button size="small">
                    <FiMessageSquare />
                  </Button>
                </CardActions>
              </Card>
              {card.user === user ? (
                <Stack
                  marginTop={2}
                  marginBottom={2}
                  display="flex"
                  justifyContent="center"
                  spacing={20}
                  direction="row"
                >
                  <Button
                    variant="contained"
                    onClick={(e) => navigate(`/update/${card.id}`)}
                  >
                    UPDATE
                  </Button>
                  <Button
                    variant="contained"
                    style={{ background: "red" }}
                    onClick={() => deleteCard(card.id)}
                  >
                    DELETE
                  </Button>
                </Stack>
              ) : null}
            </Stack>
          </Stack>
        ) : null
      )}
    </div>
  );
};

export default Details;
