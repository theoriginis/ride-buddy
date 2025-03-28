import React, { useState } from "react";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import TripForm from "../components/TripForm";
import RideList from "../components/RideList";
import axios from "axios";

function HomePage() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [rideData, setRideData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (event) => {
    console.log("Submit");
    event.preventDefault();

    try {
      let data = JSON.stringify({
        dropoff: dropoff,
        pickup: pickup,
      });
      setIsLoading(true);

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:3033/fare",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          setRideData(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });

      //   const data = JSON.stringify({
      //     dropoff: dropoff,
      //     pickup: pickup,
      //   });

      //   const response = await axios.post("http://localhost:3033/fare", data, {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   });

      //   setRideData(response.data); // Store API response in state
    } catch (error) {
      console.error("Error fetching ride data:", error);
    }
  };
  return (
    <Box>
      <Navbar loggedIn={true} /> {/* Navbar stays common across pages */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Stack on small screens, row on medium+
          alignItems: "center",
          justifyContent: "space-around",
          padding: { xs: 0, md: 4 }, // Reduce padding for small screens
          gap: { xs: 3, md: 0 }, // Adds spacing between elements on mobile
        }}
      >
        {/* TripForm - Adjust width for responsiveness */}
        <Box sx={{ width: { xs: "90%", md: "35%" } }}>
          <TripForm
            pickup={pickup}
            dropoff={dropoff}
            setPickup={setPickup}
            setDropoff={setDropoff}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </Box>

        {/* Responsive Image */}
        <Box
          component="img"
          src="/map.jpg"
          alt="Map"
          sx={{
            display: { xs: "none", md: "block" },
            borderRadius: "10px",
            width: { xs: "90%", md: "30%" }, // Full width on mobile, 30% on desktop
            height: { xs: "auto", md: "600px" }, // Maintain aspect ratio on mobile
            objectFit: "cover", // Ensures proper image fit
          }}
        />

        {/* RideList - Adjust width for responsiveness */}
        {rideData && (
          <Box sx={{ width: { xs: "90%", md: "30%" } }}>
            <RideList
              heading={false}
              homepage={false}
              rideData={rideData}
              isLoading={isLoading}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default HomePage;
