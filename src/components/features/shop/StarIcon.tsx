interface StarIconProps {
    filled?: boolean
    size?: "sm" | "md"
  }
  
  export function StarIcon({ filled = true, size = "md" }: StarIconProps) {
    const sizeClass = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"
  
    return (
      <svg
        className={`${sizeClass} ${filled ? "fill-yellow-400 text-yellow-400" : "fill-slate-200 text-slate-200"}`}
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 1l3.09 6.26L20 7.24l-5 4.87 1.18 6.88L10 15.77l-6.18 3.25L5 12.11 0 7.24l6.91-1.01L10 1z" />
      </svg>
    )
  }
  