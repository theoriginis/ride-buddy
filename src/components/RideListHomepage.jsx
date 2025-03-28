import React from "react";
import { Box, Typography, Card, Button } from "@mui/material";

function RideListHomepage({ heading = true, homepage = false }) {
  const rides = [
    { name: "Bolt", price: "£5.34", cheapest: true, image: "bolt-logo.jpeg" },
    { name: "Uber", price: "£5.48", cheapest: false, image: "uber-logo.png" },
    { name: "Lyft", price: "£5.42", cheapest: false, image: "lyft-logo.png" },
  ];

  return (
    <Box sx={{ minWidth: "400px", padding: 4 }}>
      {heading && (
        <Typography variant="h4" sx={{ color: "black", mb: 4 }}>
          Your Savings
        </Typography>
      )}
      {rides.map((ride, index) => (
        <>
          {ride.cheapest && (
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: "black",
                  mb: 0.25,
                  fontWeight: 500,
                  py: 0.5,
                  width: "80px",
                  textAlign: "center",
                  background: "#E8F5E9",
                  borderTopRightRadius: "10px",
                  borderTopLeftRadius: "10px",
                }}
              >
                Cheapest
              </Typography>
            </Box>
          )}
          <Card
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "none",
              border: "0px",
              borderRadius: "20px",
              borderTopRightRadius: ride.cheapest ? "0px" : "20px",
              marginY: 1,
              padding: 2,
              mt: 0,
              mb: 5,
              bgcolor: ride.cheapest ? "#E8F5E9" : "#F4F4F4",
            }}
          >
            <img
              src={ride.image}
              alt="Logo"
              style={{ height: 50, marginRight: 10, borderRadius: "10px" }}
            />
            <Typography sx={{ fontWeight: "bold" }}>{ride.price}</Typography>
            <Button
              variant="outlined"
              disabled={homepage}
              sx={{
                borderColor: "#6EB995", // Set border color
                color: "#6EB995", // Set text color
                borderRadius: "20px",
                background: "#FFFFFF",
                fontSize: "18px",
                px: "20px",
                height: "50px",
                fontWeight: 500,
                "&:hover": {
                  borderColor: "#6EB995", // Set hover border color
                  backgroundColor: "rgba(110, 185, 149, 0.1)", // Optional: change background color on hover
                },
              }}
            >
              GET
            </Button>
          </Card>
        </>
      ))}
    </Box>
  );
}

export default RideListHomepage;
