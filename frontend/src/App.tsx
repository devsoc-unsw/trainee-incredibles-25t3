import { Route, Routes } from 'react-router-dom'
import Dashboard from '@/pages/dashboard/Dashboard';
import RestaurantPage from '@/pages/restaurantPage/RestaurantPage';
import Search from '@/pages/search/Search';
import Profile from '@/pages/profile/Profile';

export default function App() {

  return (
    <div className="app-root">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/restaurant" element={<RestaurantPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}
