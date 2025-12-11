export function AppIcon({ className }: { className?: string }) {
  const colors = [
    { base: "#ef4444", light: "#f87171", dark: "#dc2626", lighter: "#fca5a5" }, // Red
    { base: "#f59e0b", light: "#fbbf24", dark: "#d97706", lighter: "#fcd34d" }, // Orange/Yellow
    { base: "#84cc16", light: "#a3e635", dark: "#65a30d", lighter: "#bef264" }, // Lime/Green
    { base: "#06b6d4", light: "#22d3ee", dark: "#0891b2", lighter: "#67e8f9" }, // Cyan
    { base: "#3b82f6", light: "#60a5fa", dark: "#2563eb", lighter: "#93c5fd" }, // Blue
    { base: "#8b5cf6", light: "#a78bfa", dark: "#7c3aed", lighter: "#c4b5fd" }, // Purple
  ];

  return (
    <div
      className={`flex flex-wrap content-between justify-between ${className}`}
      style={{ aspectRatio: "1.618" }}
    >
      {colors.map((color, i) => (
        <div
          key={i}
          style={{
            width: "30%",
            height: "46%",
            display: "flex",
            flexWrap: "wrap",
            alignContent: "space-between",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              backgroundColor: color.light,
              width: "46%",
              height: "46%",
              borderRadius: "15%",
            }}
          />
          <div
            style={{
              backgroundColor: color.base,
              width: "46%",
              height: "46%",
              borderRadius: "15%",
            }}
          />
          <div
            style={{
              backgroundColor: color.lighter,
              width: "46%",
              height: "46%",
              borderRadius: "15%",
            }}
          />
          <div
            style={{
              backgroundColor: color.dark,
              width: "46%",
              height: "46%",
              borderRadius: "15%",
            }}
          />
        </div>
      ))}
    </div>
  );
}
