import { useEffect, useState } from "react";
import Card from "./card";
import { Info } from "lucide-react";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/news/");
        const data = await response.json();

        if (data.results) {
          setNews(data.results);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown Date";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="mt-12 mb-8 px-6">
      <h2 className="text-2xl text-gray-500 font-bold mb-6">Updates about reef</h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : news.length > 0 ? (
        <div className="space-y-6">
          {news.map((article, index) => (
            <Card key={index} className="hover:shadow-md transition-all duration-300 p-4 bg-white">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 text-blue-600 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Info size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 text-black">{article.title}</h3>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm font-medium text-blue-600">
                      By {article.author || "Unknown Author"}
                    </span>
                    <span className="text-xs text-gray-500">{formatDate(article.created_date)}</span>
                  </div>
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 font-medium text-sm"
                  >
                    Read more
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No news available.</p>
      )}
    </div>
  );
};

export default News;
