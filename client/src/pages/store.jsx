import { useState, useEffect } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";
import Card  from "../components/card";
import { Trash, Mail, AlertCircle } from "lucide-react";

const Store = () => {
  const [reefs, setReefs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReefs = async () => {
      try {
        const response = await axios.get("/api/get_images/");
        setReefs(response.data.coral_images || []);
      } catch (error) {
        console.error("Error fetching reef data:", error);
        setReefs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchReefs();
  }, []);

  const handleDelete = async (reefId) => {
    try {
      await axios.delete(`/api/delete_reef/${reefId}/`);
      setReefs(reefs.filter((reef) => reef.id !== reefId));
      alert("Reef deleted successfully!");
    } catch (error) {
      console.error("Error deleting reef:", error);
      alert("Failed to delete reef.");
    }
  };

  const sendEmail = (reef, isEmergency = false) => {
    const templateParams = {
      user_email: "admin@example.com",
      reef_status: reef.status,
      reef_location: `${reef.latitude}, ${reef.longitude}`,
      reef_image: reef.image_url,
      emergency: isEmergency ? "Urgent! This reef is in critical condition!" : "",
    };

    emailjs
      .send("service_xxxxx", "template_xxxxx", templateParams, "YOUR_PUBLIC_KEY")
      .then(
        () => alert(isEmergency ? "Emergency alert sent!" : "Email sent successfully!"),
        (error) => console.error("Email send error:", error)
      );
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg w-full">
      <h2 className="text-2xl font-bold text-center mb-6">Coral Reef Store</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading reefs...</p>
      ) : reefs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reefs.map((reef) => (
            <Card key={reef.id} className="p-5 shadow-md bg-gray-100">
              <div className="relative h-48 overflow-hidden rounded-md">
                <img
                  src={reef.image_url}
                  alt={`Reef at ${reef.latitude}, ${reef.longitude}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-3">
                <h3 className="text-lg font-semibold">Status: {reef.status}</h3>
                <p className="text-sm text-gray-600">Location: {reef.latitude}, {reef.longitude}</p>
                <p className="text-sm text-gray-500">Uploaded on: {new Date(reef.uploaded_at).toLocaleDateString()}</p>
              </div>

              <div className="flex gap-2 mt-4">
                <button className="btn btn-error flex items-center gap-1" onClick={() => handleDelete(reef.id)}>
                  <Trash size={16} />
                  Delete
                </button>

                <button className="btn btn-primary flex items-center gap-1" onClick={() => sendEmail(reef)}>
                  <Mail size={16} />
                  Send Email
                </button>

                {reef.status === "Bleached" && (
                  <button className="btn btn-warning flex items-center gap-1" onClick={() => sendEmail(reef, true)}>
                    <AlertCircle size={16} />
                    Emergency
                  </button>
                )}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No coral reefs available.</p>
      )}
    </div>
  );
};

export default Store;