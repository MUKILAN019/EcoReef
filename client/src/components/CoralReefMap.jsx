import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Card from "./card";
import { Map, X } from "lucide-react";

const coralReefAPI = "https://api.inaturalist.org/v1/observations?taxon_id=47532&per_page=200";

const CoralReefMap = () => {
  const [reefData, setReefData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoralReefData = async () => {
      try {
        const response = await fetch(coralReefAPI);
        const data = await response.json();
        if (data.results) {
          const filteredData = data.results
            .filter((item) => item.geojson && item.geojson.coordinates)
            .map((item) => ({
              id: item.id,
              name: item.taxon?.name || "Unknown Species",
              lat: item.geojson.coordinates[1],
              lng: item.geojson.coordinates[0],
              link: item.uri,
            }));
          setReefData(filteredData);
        }
      } catch (error) {
        console.error("Error fetching coral reef data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoralReefData();
  }, []);

  const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/616/616490.png",
    iconSize: [25, 25],
    iconAnchor: [12, 25],
    popupAnchor: [0, -20],
  });

  return (
    <>
      {/* Main Card UI */}
      <Card>
        <h3 className="text-xl font-bold mb-4 text-white">Interactive Map</h3>
        <div className="relative h-56 bg-ocean-50 rounded-lg overflow-hidden mb-4">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* <Map className="text-ocean-300" size={48} />. */}
            <img src="https://media.istockphoto.com/id/607915266/vector/blue-world-map-illustration.jpg?s=612x612&w=0&k=20&c=-uylkPVyc-XvkNWYeldkoEoyS14OiIyvXbY2hmqpAXg=" alt="" />
            <div className="absolute inset-0 bg-ocean-500/5"></div>
          </div>
          <div className="absolute inset-0 border-4 border-white rounded-lg pointer-events-none"></div>
        </div>
        <p className="text-sm mb-4 text-gray-500">
          Explore coral reef locations around the world.
        </p>
        {/* ✅ DaisyUI Modal Trigger */}
        <button onClick={() => document.getElementById("reef_modal").showModal()} className="btn btn-primary w-full">
          Open Interactive Map
        </button>
      </Card>

      {/* DaisyUI Modal */}
      <dialog id="reef_modal" className="modal">
        <div className="modal-box w-[90%] h-[80%] max-w-5xl p-0">
          {/* Close Button */}
          <form method="dialog" className="absolute top-4 right-4">
            <button className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition duration-200">
              <X size={24} className="text-gray-600" />
            </button>
          </form>

          {/* Interactive Map */}
          <MapContainer
            center={[0, 0]}
            zoom={2}
            className="w-full h-full rounded-lg overflow-hidden"
            dragging={false}
            scrollWheelZoom={false}
            doubleClickZoom={false}
            zoomControl={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {reefData.map((reef) => (
              <Marker key={reef.id} position={[reef.lat, reef.lng]} icon={customIcon}>
                <Popup>
                  <strong>{reef.name}</strong>
                  <br />
                  <a href={reef.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    View on iNaturalist
                  </a>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        {/* Click Outside to Close */}
        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
    </>
  );
};

export default CoralReefMap;
