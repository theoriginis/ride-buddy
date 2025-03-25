import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MyLocationIcon from "@mui/icons-material/MyLocation";

function TripForm() {
  return (
    <Box sx={{ minWidth: "400px", padding: 4 }}>
      <Typography variant="h4" sx={{ color: "black" }}>
        Plan Your Trip
      </Typography>
      <Typography sx={{ marginBottom: 2, fontWeight: 500, py: 3 }}>
        Ride<span style={{ color: "#6EB995" }}>Buddy</span> finds the best deal
        for you.
      </Typography>
      <Typography variant="body1" sx={{ color: "black", mb: 1 }}>
        From
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        // label="From"
        defaultValue="27 Granville Road"
        sx={{
          marginBottom: 2,
          "& fieldset": {
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": { borderColor: "#6EB995" }, // Changes focus border to green
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MyLocationIcon sx={{ fill: "#000000" }} />
            </InputAdornment>
          ),
        }}
      />
      <Typography variant="body1" sx={{ color: "black", my: 1 }}>
        To
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        // label="To"
        defaultValue="JJ street"
        sx={{
          marginBottom: 2,
          "& fieldset": {
            borderBottomLeftRadius: "20px",
            borderBottomRightRadius: "20px",
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": { borderColor: "#6EB995" }, // Changes focus border to green
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LocationOnIcon />
            </InputAdornment>
          ),
        }}
      />
      <Typography variant="body1" sx={{ color: "black", my: 1 }}>
        People
      </Typography>
      <TextField
        variant="outlined"
        // label="People"
        defaultValue="1-4"
        sx={{
          marginBottom: 2,
          width: "150px",
          "& fieldset": {
            borderBottomLeftRadius: "20px",
            borderBottomRightRadius: "20px",
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": { borderColor: "#6EB995" }, // Changes focus border to green
          },
        }}
      />
      <Button
        variant="contained"
        sx={{
          bgcolor: "#8BC48A",
          height: "56px",
          width: "100px",
          ml: "40px",
          fontSize: "18px",
          fontWeight: "500 !important",
          borderRadius: "10px",
          px: "20px !important",
        }}
      >
        Search
      </Button>
    </Box>
  );
}

export default TripForm;
