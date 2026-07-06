"use client"

interface EdgeBlurProps {
  position?: "top" | "bottom"
  height?: number
  bgColor?: string
}

export function EdgeBlur({ position = "bottom", height = 75, bgColor }: EdgeBlurProps) {
  const blurLayers = [1, 2, 3, 6, 12]

  const isTop = position === "top"
  const maskDirection = isTop ? "bottom" : "top"

  return (
    <div
      className={`fixed inset-x-0 isolate z-40 pointer-events-none ${isTop ? "top-0" : "bottom-0"}`}
      style={{ height }}
    >
      {bgColor && (
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: bgColor,
            maskImage: `linear-gradient(to ${maskDirection}, black, transparent)`,
            WebkitMaskImage: `linear-gradient(to ${maskDirection}, black, transparent)`,
          }}
        />
      )}
      {blurLayers.map((blur) => (
        <div
          key={blur}
          className="absolute inset-0"
          style={{
            backdropFilter: `blur(${blur}px)`,
            WebkitBackdropFilter: `blur(${blur}px)`,
            maskImage: `linear-gradient(to ${maskDirection}, black, transparent)`,
            WebkitMaskImage: `linear-gradient(to ${maskDirection}, black, transparent)`,
          }}
        />
      ))}
    </div>
  )
}

export function TopBlur({ height = 75, bgColor }: { height?: number; bgColor?: string }) {
  return <EdgeBlur position="top" height={height} bgColor={bgColor} />
}

// export function BottomBlur({ height = 75, bgColor }: { height?: number; bgColor?: string }) {
//   return <EdgeBlur position="bottom" height={height} bgColor={bgColor} />
// }
