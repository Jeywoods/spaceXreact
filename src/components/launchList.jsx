import React from "react";

export function LaunchList({ launches = [], onHover, loading = false }) {
  
  // Если данные ещё загружаются — показываем простое сообщение
  if (loading) {
    return (
      <aside className="aside" id="launchesContainer">
        <h3>Launches</h3>
        <div id="listContainer">Loading launches...</div>
      </aside>
    );
  }

  // Основной вывод компонента
  return (
    <aside
      className="aside"
      id="launchesContainer"
      style={{ width: 320, maxHeight: 600, overflowY: "auto" }}
    >
      <h3>Launches</h3>

      <div id="listContainer">
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {launches.map((launch) => {
            const padId = launch.launchpad || null;

            return (
              <li
                key={launch.id}
                
                // При наведении сообщаем карте, какая площадка соответствует запуску
                onMouseEnter={() => onHover && onHover(padId)}
                onMouseLeave={() => onHover && onHover(null)}

                // Стили для элемента списка
                style={{
                  cursor: padId ? "pointer" : "default",
                  padding: "8px 6px",
                  borderBottom: "1px solid #eee",
                  opacity: padId ? 1 : 0.6 
                }}
              >
                {launch.name}
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
