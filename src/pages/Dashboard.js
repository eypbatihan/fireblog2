import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FiMessageSquare from "@mui/icons-material/Message";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { cardsArray, isLoading } = React.useContext(AuthContext);

  return (
    <div style={{ margin: "5rem", color: "#046586" }}>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <div>
          <Typography
            component={"span"}
            variant="body1"
            style={{
              color: "#046582",
              fontFamily: "Girassol",
              fontSize: "1.5 rem",
            }}
          >
            <h1>─── Dashboard ───</h1>
          </Typography>
          <Grid container spacing={2}>
            {cardsArray.map((card) => (
              <Grid item key={card.id} xs={10} md={6} lg={4} xl={2}>
                <Card
                  sx={{
                    Width: 345,
                    Height: 425,
                    borderBottom: "1px solid gray",
                    cursor: "pointer",
                  }}
                  onClick={(e) => navigate(`/details/${card.id}`)}
                >
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140px"
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
                    <Typography variant="body1" color="text.secondary">
                      {card.date}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
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
              </Grid>
            ))}
          </Grid>{" "}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
