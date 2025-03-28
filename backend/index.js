const express = require("express");
const axios = require("axios");
const cors = require("cors"); // Import CORS package

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS

const MAPBOX_ACCESS_TOKEN =
  "sk.eyJ1IjoibWFyd2FuYWJhcmlzIiwiYSI6ImNtOHE4NDZ1OTBpaWoya3F4MzA5MW15bmoifQ.2RRhuXBpb2407_1j-YvamA";
const OPENWEATHERMAP_API_KEY = "f0067ff7d226fb1a8ff0187db4d7844a";
const HERE_API_KEY = "mUvh2zBwW995rR7cREG2_n8dRYlbpSilDTCqZq0XjDc";

async function getPlaceDetails(address) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${MAPBOX_ACCESS_TOKEN}`;
  const response = await axios.get(url);
  if (response.data.features.length === 0) throw new Error("Invalid address");

  const feature = response.data.features[0];
  return {
    coordinates: feature.center,
    placeId: feature.id,
    placeName: feature.place_name,
    context: feature.context ? JSON.stringify(feature.context) : "[]",
  };
}

async function snapToRoad(coords) {
  const nearbyPoint = [coords[0] + 0.0001, coords[1] + 0.0001];
  const url = `https://api.mapbox.com/matching/v5/mapbox/driving/${coords[0]},${coords[1]}${nearbyPoint[0]},${nearbyPoint[1]}?access_token=${MAPBOX_ACCESS_TOKEN}&geometries=geojson`;

  try {
    const response = await axios.get(url);
    if (!response.data.matches || response.data.matches.length === 0) {
      console.warn("Warning: No road match found, using original coordinates.");
      return coords;
    }
    return response.data.matches[0].geometry.coordinates[0];
  } catch (error) {
    console.error(
      `Map Matching API error: ${
        error.response ? error.response.data.message : error.message
      }`
    );
    return coords;
  }
}

async function getRoute(startCoords, endCoords) {
  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${parseFloat(
    startCoords[0]
  )},${parseFloat(startCoords[1])};${parseFloat(endCoords[0])},${parseFloat(
    endCoords[1]
  )}?geometries=polyline&access_token=${MAPBOX_ACCESS_TOKEN}`;
  console.log(url);
  console.log(url);
  try {
    const response = await axios.get(url);
    if (!response.data.routes || response.data.routes.length === 0)
      throw new Error("No route found");
    const route = response.data.routes[0];
    return {
      distance: route.distance,
      duration: route.duration,
      polyline: route.geometry,
    };
  } catch (error) {
    console.error(
      `Directions API error: ${
        error.response ? error.response.data.message : error.message
      }`
    );
    throw new Error("Route calculation failed");
  }
}

async function getWeatherNextHour(lat, lon) {
  console.log(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&appid=${OPENWEATHERMAP_API_KEY}&units=metric`
  );
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&appid=${OPENWEATHERMAP_API_KEY}&units=metric`;
  try {
    const response = await axios.get(url);
    const hourlyForecast = response.data.hourly[1];
    return hourlyForecast.weather[0].description;
  } catch (error) {
    console.error(
      `Weather API error: ${
        error.response ? error.response.data.message : error.message
      }`
    );
    return "unknown";
  }
}

async function getTravelTime(startCoords, endCoords) {
  const url = `https://router.hereapi.com/v8/routes?transportMode=car&origin=${startCoords[1]},${startCoords[0]}&destination=${endCoords[1]},${endCoords[0]}&return=summary&apikey=${HERE_API_KEY}`;
  try {
    const response = await axios.get(url);
    const route = response.data.routes[0];
    const travelTimeSeconds = route.sections[0].summary.duration;
    return Math.ceil(travelTimeSeconds / 60);
  } catch (error) {
    console.error(
      `HERE Maps API error: ${
        error.response ? error.response.data.message : error.message
      }`
    );
    return null;
  }
}

async function createPayload(startAddress, endAddress) {
  try {
    const startDetails = await getPlaceDetails(startAddress);
    console.log("startDetails", startDetails);
    const endDetails = await getPlaceDetails(endAddress);
    console.log("startDetails", endDetails);

    const startSnapped = await snapToRoad(startDetails.coordinates);
    const endSnapped = await snapToRoad(endDetails.coordinates);
    console.log("startSnapped", startSnapped, endSnapped);

    const routeDetails = await getRoute(startSnapped, endSnapped);
    console.log("routeDetails", routeDetails);

    const weatherNextHour = await getWeatherNextHour(
      startDetails.coordinates[1],
      startDetails.coordinates[0]
    );
    const travelTime = await getTravelTime(startSnapped, endSnapped);

    return {
      start: startSnapped.reverse().join(","),
      end: endSnapped.reverse().join(","),
      start_a: startDetails.placeName,
      end_a: endDetails.placeName,
      start_place_id: startDetails.placeId,
      end_place_id: endDetails.placeId,
      start_context: startDetails.context,
      end_context: endDetails.context,
      ...routeDetails,
      subset: "",
      weatherNextHour,
      travelTime,
    };
  } catch (error) {
    console.error("Error creating payload:", error.message);
    return null;
  }
}

async function extractOptions(payload, options) {
  console.log(options);
  const result = [];

  for (const estimate of payload.fare_estimates) {
    if (estimate.options && estimate.options.length > 0) {
      for (const option of estimate.options) {
        const display_name = option.name;
        const image_link =
          option.company_logo_url && option.company_logo_url !== ""
            ? option.company_logo_url
            : estimate.service.company.logo_url;
        const total_price = option.price;
        result.push({
          display_name,
          image_link,
          total_price,
          weather_next_hour: options.weatherNextHour,
          travel_time: options.travelTime,
        });
      }
    } else if (estimate.total_fare !== null) {
      const display_name = estimate.service.name;
      const image_link = estimate.service.company.logo_url;
      const total_price = estimate.total_fare;
      result.push({
        display_name,
        image_link,
        total_price,
        weather_next_hour: payload.weather_next_hour,
        travel_time: payload.travel_time,
      });
    }
  }

  return result;
}

app.post("/fare", async (req, res) => {
  try {
    console.log("body", req.body);
    const { pickup, dropoff } = req.body;
    console.log(pickup, dropoff);

    if (!pickup || !dropoff) {
      return res
        .status(400)
        .json({ error: "Pickup and dropoff locations are required" });
    }

    const payload = await createPayload(pickup, dropoff);
    if (!payload) {
      return res.status(500).json({ error: "Failed to generate payload" });
    }

    console.log("Generated Payload:", payload);

    const rideGuruResponse = await axios.post(
      "https://ride.guru/api/fares.json",
      payload,
      {
        headers: {
          Host: "ride.guru",
          Cookie:
            "csrftoken=S5IizSbWQFEYmPV7KwENc7UmBgBYUgF7vnYdNTwOtCZyoYHLCfCM3yZr7R800Xof",
          "x-csrftoken":
            "S5IizSbWQFEYmPV7KwENc7UmBgBYUgF7vnYdNTwOtCZyoYHLCfCM3yZr7R800Xof",
          "user-agent":
            "Mozilla/5.0 (Macintosh Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
          accept: "application/json, text/plain, */*",
          "content-type": "application/json; charset=UTF-8",
          Referer: "https://ride.guru/",
        },
      }
    );

    const returnPayload = await extractOptions(rideGuruResponse.data, payload);
    console.log(returnPayload);
    res.json(returnPayload);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Error fetching fare data" });
  }
});

app.listen(3033, () => {
  console.log("Server running on port 3000");
});
