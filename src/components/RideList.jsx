import React from "react";
import { Box, Typography, Card, Button, CircularProgress } from "@mui/material";

function RideList({
  heading = true,
  homepage = false,
  rideData = [],
  isLoading = false,
}) {
  function sortByPrice(data = [], order = "asc") {
    if (!Array.isArray(data)) return []; // Ensure it's an array
    return [...data].sort((a, b) =>
      order === "asc"
        ? a.total_price - b.total_price
        : b.total_price - a.total_price
    );
  }
  if (isLoading)
    return (
      <Box
        sx={{
          width: "400px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    rideData &&
    rideData.length > 0 && (
      <Box
        sx={{
          minWidth: "400px",
          padding: 4,
          height: "400px",
          overflowY: "scroll",
        }}
      >
        {heading && (
          <Typography variant="h4" sx={{ color: "black", mb: 4 }}>
            Your Savings
          </Typography>
        )}
        {sortByPrice(rideData).map((ride, index) => (
          <>
            {index === 0 && (
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
                borderTopRightRadius: index === 0 ? "0px" : "20px",
                marginY: 1,
                padding: 2,
                mt: 0,
                mb: 2,
                bgcolor: index === 0 ? "#E8F5E9" : "#F4F4F4",
              }}
            >
              <img
                src={ride.image_link}
                alt="Logo"
                style={{ height: 50, marginRight: 10, borderRadius: "10px" }}
              />
              <Typography sx={{ fontWeight: "bold" }}>
                {ride.total_price}
              </Typography>
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
    )
  );
}

export default RideList;
