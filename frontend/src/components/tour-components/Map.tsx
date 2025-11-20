import { useEffect, useRef } from "react";
import { useFetchSingleTour } from "../../hooks/useFetchSingleTour";

// MAPBOX related imports
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapboxMap {
  remove: () => void;
}

interface Location {
  type: string;
  coordinates: [number, number]; // Tuple: [longitude, latitude]
  day: number;
  description: string;
  _id?: string; // Optional, if your DB sends IDs
}

const Map = () => {
  const { tour } = useFetchSingleTour();

  // 1. Ref for the HTML container
  const mapContainerRef = useRef(null);
  // 2. Ref to store the Mapbox instance (Prevents duplicates)
  const mapInstanceRef = useRef<MapboxMap | null>(null);

  useEffect(() => {
    // A. Safety Check: If tour isn't loaded or map already exists, stop.
    if (!tour || !mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // <--- BLOCKS DUPLICATE RENDERS

    const locations = tour.locations;

    if (locations && locations.length > 0) {
      mapboxgl.accessToken =
        "pk.eyJ1Ijoiam9uYXNzY2htZWR0bWFubiIsImEiOiJjam54ZmM5N3gwNjAzM3dtZDNxYTVlMnd2In0.ytpI7V7w7cyT1Kq5rT9Z1A";

      // B. Create Map
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/jonasschmedtmann/cjnxfn3zk7bj52rpegdltx58h",
        scrollZoom: false,
        interactive: false,
      });

      // Save the map instance to the ref so we don't create it again
      mapInstanceRef.current = map;

      const bounds = new mapboxgl.LngLatBounds();

      locations.forEach((loc: Location) => {
        // Create marker element
        const el = document.createElement("div");
        el.className = "marker";

        // Add Marker
        new mapboxgl.Marker({
          element: el,
          anchor: "bottom",
        })
          .setLngLat(loc.coordinates)
          .addTo(map);

        // Add Popup
        new mapboxgl.Popup({
          offset: 30,
          closeOnClick: false,
        })
          .setLngLat(loc.coordinates)
          .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
          .addTo(map);

        bounds.extend(loc.coordinates);
      });

      // Fit map to bounds (with some padding)
      map.fitBounds(bounds, {
        padding: { top: 200, bottom: 150, left: 100, right: 100 },
      });
    }

    // C. Cleanup Function
    // When the user leaves the page or tour changes, destroy the map.
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [tour]);

  return (
    <section className="section-map">
      <div
        id="map"
        ref={mapContainerRef}
        style={{ width: "100%", height: "500px" }}
      ></div>
    </section>
  );
};

export default Map;
