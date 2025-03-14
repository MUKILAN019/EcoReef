import { useState, useEffect } from "react";
import Card  from "./card";
import axios from "axios";

const Postcards = ({ searchQuery }) => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/get_images/"); 
        const data = response.data;

        if (Array.isArray(data)) {
          setPosts(data);
          setFilteredPosts(data);
        } else if (Array.isArray(data.coral_images)) {
          setPosts(data.coral_images);
          setFilteredPosts(data.coral_images);
        } else {
          console.error("API response is not an array:", data);
          setPosts([]);
          setFilteredPosts([]);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
        setFilteredPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = posts.filter(
      (post) =>
        post.user.toLowerCase().includes(lowerCaseQuery) ||
        post.status.toLowerCase().includes(lowerCaseQuery) ||
        `${post.latitude}, ${post.longitude}`.includes(lowerCaseQuery)
    );
    setFilteredPosts(filtered);
  }, [searchQuery, posts]);

  return (
    <div className="w-full lg:w-2/3">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          Coral Explorations from Our Enthusiasts
        </h2>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 mt-2">Loading coral explorations...</p>
      ) : filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post, i) => (
            <Card
              key={i}
              className="overflow-hidden p-0 h-full hover:shadow-xl transition-all duration-300 bg-blue-200"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image_url}
                  alt={`Coral at ${post.latitude}, ${post.longitude}`}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-white">Coral Status: {post.status}</h3>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-gray-700">Posted by: {post.user}</p>
                <p className="text-sm text-gray-700">Location: {post.latitude}, {post.longitude}</p>
                <p className="text-sm text-gray-700">Uploaded on: {new Date(post.uploaded_at).toLocaleDateString()}</p>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-2">No matching coral explorations found.</p>
      )}
    </div>
  );
};

export default Postcards;