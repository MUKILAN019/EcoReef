import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";  
import "leaflet/dist/leaflet.css";



const getCoralIcon = (status) => {
    let color;
    if (status === "Healthy") color = "green";
    else if (status === "Partially Bleached") color = "orange";
    else color = "red";
  
    return L.divIcon({  
      className: "custom-marker",
      html: `<div style="
        width: 12px;
        height: 12px;
        background-color: ${color};
        border-radius: 50%;
        box-shadow: 0 0 5px ${color};
        "></div>`,
    });
  };
  

// Click handler for setting location
const ClickToSetMarker = ({ setLatitude, setLongitude, setMarkerPosition }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setLatitude(lat.toFixed(6));
      setLongitude(lng.toFixed(6));
      setMarkerPosition([lat, lng]);
    },
  });
  return null;
};

const Create = () => {
  const [file, setFile] = useState(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [markerPosition, setMarkerPosition] = useState(null);
  const [coralData, setCoralData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [map, setMap] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/get_images/")
      .then((res) => {
        if (Array.isArray(res.data.coral_images)) {
          setCoralData(res.data.coral_images);
        } else {
          console.error("API response is not an array:", res.data);
          setCoralData([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching coral data:", error);
        setCoralData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Search location function
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    const apiKey = "fc871a3692cb49fc939aa7c573eed86a"; // Free API key from OpenCageData
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(searchQuery)}&key=${apiKey}`;

    try {
      const res = await axios.get(url);
      if (res.data.results.length > 0) {
        const { lat, lng } = res.data.results[0].geometry;
        setLatitude(lat.toFixed(6));
        setLongitude(lng.toFixed(6));
        setMarkerPosition([lat, lng]);
        if (map) {
          map.setView([lat, lng], 10);
        }
      } else {
        alert("Location not found!");
      }
    } catch (error) {
      alert("Error fetching location. Try again.");
    }
  };

  // Upload function
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select an image before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("user_id", 1);

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/upload_image/", formData);
      alert("Upload Successful: " + res.data.status);
      setCoralData([...coralData, res.data]); // Add new coral data to list
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image. Try again.");
    }
  };

  return (
    <div className="bg-[#1d232a]">
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg w-full">
      <h2 className="text-2xl font-bold text-center mb-4">Coral Reef Health Tracker</h2>

      {/* Search Bar */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search a place..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Search
        </button>
      </div>

      {/* File Upload Form */}
      <form onSubmit={handleUpload} className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
        <div className="mb-2">
          <label className="font-semibold">Upload Coral Image:</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} required className="block w-full border border-gray-400 rounded-xl px-2 py-2 h-10 pl-2"/>
        </div>

        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            required
            className="w-1/2 p-2 border rounded-md"
          />
          <input
            type="number"
            placeholder="Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
            className="w-1/2 p-2 border rounded-md"
          />
        </div>

        <button type="submit" className="mt-3 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600">
          Upload Reef Data
        </button>
      </form>

      {/* Leaflet Map */}
      <div className="rounded-lg overflow-hidden shadow-md">
        <MapContainer center={[0, 0]} zoom={2} style={{ height: "500px", width: "100%" }} whenCreated={setMap}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <ClickToSetMarker setLatitude={setLatitude} setLongitude={setLongitude} setMarkerPosition={setMarkerPosition} />

          {/* User's Selected Location */}
          {markerPosition && (
            <Marker position={markerPosition}>
              <Popup>
                <p><strong>Selected Location</strong></p>
                <p>Latitude: {latitude}</p>
                <p>Longitude: {longitude}</p>
              </Popup>
            </Marker>
          )}

          {/* Coral Data from API */}
          {loading ? (
            <p className="text-center text-gray-500 mt-2">Loading coral data...</p>
          ) : coralData.length > 0 ? (
            coralData.map((coral, idx) => (
              <Marker
                key={idx}
                position={[coral.latitude, coral.longitude]}
                icon={getCoralIcon(coral.status)}
              >
                <Popup>
                  <p><strong>Status:</strong> {coral.status}</p>
                  <img src={coral.image_url} alt="Coral" className="w-32 h-20 object-cover mt-2 rounded-md" />
                </Popup>
              </Marker>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-2">No coral data available.</p>
          )}
        </MapContainer>
      </div>
    </div>
    </div>
  );
};

export default Create;
