import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import blogReducer from './slices/blogSlice';
import portfolioReducer from './slices/portfolioSlice';
import settingsReducer from './slices/settingsSlice';
import workReducer from './slices/workSlice';
import influencesReducer from './slices/influencesSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  blog: blogReducer,
  portfolio: portfolioReducer,
  settings: settingsReducer,
  work: workReducer,
  influences: influencesReducer,
});

export default rootReducer;
