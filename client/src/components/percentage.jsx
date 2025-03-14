import { useEffect, useState } from "react";

const coralReefAPI = "https://api.inaturalist.org/v1/observations?taxon_id=47532&per_page=200";

const Percentage = () => {
  const [speciesData, setSpeciesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoralReefData = async () => {
      try {
        const response = await fetch(coralReefAPI);
        const data = await response.json();
        if (data.results) {
          const speciesCount = {};

          data.results.forEach((item) => {
            const speciesName = item.taxon?.name || "Unknown Species";
            speciesCount[speciesName] = (speciesCount[speciesName] || 0) + 1;
          });

          const total = data.results.length;
          const speciesWithPercentage = Object.entries(speciesCount)
            .map(([name, count]) => ({
              name,
              count,
              percentage: ((count / total) * 100).toFixed(2),
            }))
            .sort((a, b) => b.count - a.count) 
            .slice(0, 5); 

          setSpeciesData(speciesWithPercentage);
        }
      } catch (error) {
        console.error("Error fetching coral reef data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoralReefData();
  }, []);

  return (
    <div className="p-4 bg-blue-200 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Top 5 Coral Reef Species</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-3">
          {speciesData.map((species, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">{species.name}</span>
                <span className="text-xs text-foreground/60">{species.percentage}%</span>
              </div>
              <div className="h-2 bg-foreground/10 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    index % 2 === 0 ? "bg-ocean-400" : "bg-sunset-400"
                  }`}
                  style={{ width: `${species.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Percentage;
