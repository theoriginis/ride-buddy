import React, { useEffect, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

// Replace with your actual Mapbox Access Token
const MAPBOX_ACCESS_TOKEN =
  "sk.eyJ1IjoibWFyd2FuYWJhcmlzIiwiYSI6ImNtOHE4NDZ1OTBpaWoya3F4MzA5MW15bmoifQ.2RRhuXBpb2407_1j-YvamA";

function TripForm({
  pickup,
  dropoff,
  setPickup,
  setDropoff,
  onSubmit,
  isLoading,
}) {
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);
  const fromContainerRef = useRef(null);
  const toContainerRef = useRef(null);

  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");

  useEffect(() => {
    if (from !== "" && to !== "") {
      console.log("new:from", from);
      console.log("to", to);
    }
  }, [from, to]);

  useEffect(() => {
    if (!MAPBOX_ACCESS_TOKEN) return;

    const setupGeocoder = (containerRef, inputRef) => {
      if (!containerRef.current || !inputRef.current) return;

      const geocoder = new MapboxGeocoder({
        accessToken: MAPBOX_ACCESS_TOKEN,
        types: "place,postcode,address",
        marker: false,
        mapboxgl: mapboxgl,
        placeholder: inputRef.current.placeholder, // Set placeholder dynamically
      });

      // Append the Geocoder inside the container
      containerRef.current.appendChild(geocoder.onAdd());

      // Listen for a selection and update the input value
      geocoder.on("result", (e) => {
        inputRef.current.value = e.result.place_name;
        console.log(
          "inputRef.current.placeholder",
          inputRef.current.placeholder
        );
        if (inputRef.current.placeholder == "Current Location") {
          setFrom(e.result.place_name);
          setPickup(e.result.place_name);
        } else if (inputRef.current.placeholder == "Destination") {
          setTo(e.result.place_name);
          setDropoff(e.result.place_name);
        }
      });

      // Hide the default Geocoder input field (but keep the dropdown functional)
      setTimeout(() => {
        const geocoderInput = containerRef.current.querySelector(
          ".mapboxgl-ctrl-geocoder input"
        );
        if (geocoderInput) {
          geocoderInput.style.display = "none";
        }
      }, 500);
    };

    setupGeocoder(fromContainerRef, fromInputRef);
    setupGeocoder(toContainerRef, toInputRef);
  }, []);
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
      <Box sx={{ position: "relative" }}>
        <TextField
          inputRef={fromInputRef}
          variant="outlined"
          placeholder="Current Location"
          fullWidth
          sx={{
            // marginBottom: 2,
            "& fieldset": { borderRadius: "10px" },
            visibility: "hidden",
          }}
        />
        {/* Geocoder Dropdown Container */}
        <Box
          ref={fromContainerRef}
          sx={{ position: "absolute", top: "0", left: 0, width: "100%" }}
        />
      </Box>
      <Typography variant="body1" sx={{ color: "black", my: 1 }}>
        To
      </Typography>
      <Box sx={{ position: "relative" }}>
        <TextField
          inputRef={toInputRef}
          variant="outlined"
          placeholder="Destination"
          fullWidth
          sx={{
            marginBottom: 2,
            "& fieldset": { borderRadius: "10px" },
            visibility: "hidden",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOnIcon />
              </InputAdornment>
            ),
          }}
        />
        {/* Geocoder Dropdown Container */}
        <Box
          ref={toContainerRef}
          sx={{ position: "absolute", top: "0", left: 0, width: "100%" }}
        />
      </Box>
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
        disabled={isLoading}
        onClick={onSubmit}
      >
        {isLoading ? "Loading..." : "Search"}
      </Button>
    </Box>
  );
}

export default TripForm;
