import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import Cta from "../components/tour-components/Cta";
import Description from "../components/tour-components/Description";
import SectionHeader from "../components/tour-components/Header";
import { useFetchSingleTour } from "../hooks/useFetchSingleTour";
import Pictures from "../components/tour-components/Pictures";
import Reviews from "../components/tour-components/Reviews";

interface MapboxMap {
  remove: () => void;
}

const Tour = () => {
  const { tour, loading, error } = useFetchSingleTour();

  // 1. Ref for the HTML container
  const mapContainerRef = useRef(null);
  // 2. Ref to store the Mapbox instance (Prevents duplicates)
  const mapInstanceRef = useRef<MapboxMap | null>(null);

  useEffect(() => {
    if (tour) {
      document.title = `${tour.name} | Tour Details`;
    }
  }, [tour]);

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
        interactive: false, // <--- THIS DISABLES ALL USER INTERACTION (Zoom/Pan)
      });

      // Save the map instance to the ref so we don't create it again
      mapInstanceRef.current = map;

      const bounds = new mapboxgl.LngLatBounds();

      locations.forEach((loc) => {
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!tour) return <p>No tour found</p>;

  return (
    <>
      <meta
        name="description"
        content={`Book your trip to ${tour.startLocation}. Price: ${tour.price}`}
      />
      <SectionHeader tourData={tour} />
      <Description />
      <Pictures />

      <section className="section-map">
        <div
          id="map"
          ref={mapContainerRef}
          style={{ width: "100%", height: "500px" }}
        ></div>
      </section>

      <Reviews />
      <Cta />
    </>
  );
};

export default Tour;
