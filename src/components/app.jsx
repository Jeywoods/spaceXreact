import React, { useEffect, useState } from "react";
import { LaunchList } from "./launchList";
import { Map } from "./map";
import { SpaceX } from "../api/spacex";

export function App() {
  const spacex = new SpaceX();

  const [launches, setLaunches] = useState([]);
  const [launchpads, setLaunchpads] = useState([]);
  //id площадки
  const [highlightedPad, setHighlightedPad] = useState(null);
  const [loading, setLoading] = useState(true);
 // Загружаем данные
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);  //индикатор загрузки
        const [ls, pads] = await Promise.all([
          spacex.launches(),
          spacex.launchpads()
        ]);

        setLaunches(ls);
        setLaunchpads(pads);
      } catch (err) {
        console.error("Ошибка загрузки данных:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <main className="main" style={{ display: "flex", gap: 20 }}>
      <LaunchList //список запусков
        launches={launches}
        onHover={setHighlightedPad}
        loading={loading}
      />

      <Map //точки и карта
        launchpads={launchpads}
        highlightedPad={highlightedPad}
      />
    </main>
  );
}
