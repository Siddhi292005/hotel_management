import { useState, useEffect } from "react";

const Hotel = ({ location }) => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const CLIENT_ID = "BxW6HL9GJDkdl6u9oFMsJPWimAIsfv9h";
  const CLIENT_SECRET = "IPm2LsZn984D4fsF";
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    if (!location) return;

    const fetchAccessToken = async () => {
      try {
        const res = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            grant_type: "client_credentials",
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
          }),
        });
        const data = await res.json();
        setAccessToken(data.access_token);
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };

    fetchAccessToken();
  }, []);

  useEffect(() => {
    if (!location || !accessToken) return;
    setLoading(true);

    const fetchHotels = async () => {
      try {

        const cityRes = await fetch(
          `https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY&keyword=${location}`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        const cityData = await cityRes.json();

        if (!cityData.data || cityData.data.length === 0) {
          throw new Error("Invalid location");
        }

        const { geoCode } = cityData.data[0];
        const { latitude, longitude } = geoCode;

        const hotelRes = await fetch(
          `https://test.api.amadeus.com/v1/shopping/hotel-offers?latitude=${latitude}&longitude=${longitude}&radius=5`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        const hotelData = await hotelRes.json();

        setHotels(hotelData.data || []);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [location, accessToken]);

  return (
    <div className="p-4">
      {loading && <p>Loading hotels...</p>}

      {location && !loading && (
        <h3 className="text-xl font-bold mb-2">Hotels in {location}</h3>
      )}

      <ul>
        {hotels.length > 0 ? (
          hotels.map((hotel, index) => (
            <li key={index} className="p-2 border-b">
              <strong>{hotel.hotel.name || "Unnamed Hotel"}</strong> - {hotel.hotel.address.lines.join(", ")}
            </li>
          ))
        ) : (
          !loading && location && <p>No hotels found for "{location}".</p>
        )}
      </ul>
    </div>
  );
};

export default Hotel;
