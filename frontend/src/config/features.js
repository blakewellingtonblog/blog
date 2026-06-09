// Central switchboard for what is publicly visible.
// Flip a value to true to relaunch that section. Admin (/admin) is unaffected
// and always has full access to every content type.
export const FEATURES = {
  CREATIVE_WORK: false,   // /portfolio + homepage Creative Work grid
  BLOG: false,            // /blog, /blog/:slug + homepage "Latest Posts"
  INFLUENCES: false,      // /influences
  SHOW_LOGIN_LINK: false, // visible "Login" link in nav. /login route stays reachable by URL.
};
