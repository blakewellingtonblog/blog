import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// React Router keeps scroll position across route changes; a content site
// should always land at the top of the new page.
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

export default ScrollToTop
