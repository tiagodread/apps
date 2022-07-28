import ResponsiveAppBar from "./components/NavCustom/ResponsiveAppBar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import "./App.css";  

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar></ResponsiveAppBar>
      <Container maxWidth="sm" className="App-container">
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Currency Converter
                </Typography>

                <Typography variant="body2">
                  Quickly convert currencies using the latest exchange rates.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" href="/currency-converter">
                  Visit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
