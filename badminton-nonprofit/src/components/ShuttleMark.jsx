// Inline shuttlecock mark — cork base with a feather skirt.
// Drawn rather than imported so it inherits currentColor and stays crisp at
// every size the site uses it (nav, footer, hero watermark).
function ShuttleMark({ size = 32, title = 'Shuttlecock' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role="img"
      aria-label={title}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      {/* feather skirt */}
      <path
        d="M24 6 8 34a1 1 0 0 0 .3 1.3l4 2.6L24 6Z"
        fill="currentColor"
        opacity="0.55"
      />
      <path d="M24 6 15 39.5l5 1.6L24 6Z" fill="currentColor" opacity="0.75" />
      <path d="M24 6v35.6h1.4L28 6h-4Z" fill="currentColor" opacity="0.9" />
      <path d="M24 6 33 41.1l5-1.6L24 6Z" fill="currentColor" opacity="0.75" />
      <path
        d="M24 6l16 28a1 1 0 0 1-.3 1.3l-4 2.6L24 6Z"
        fill="currentColor"
        opacity="0.55"
      />
      {/* cork base */}
      <circle cx="24" cy="41" r="5.5" fill="currentColor" />
    </svg>
  )
}

export default ShuttleMark
