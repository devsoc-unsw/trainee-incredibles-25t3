import { Route, Routes } from 'react-router-dom'
import Dashboard from '@/pages/dashboard/Dashboard';
import RestaurantPage from '@/pages/restaurantPage/RestaurantPage';
import Search from '@/pages/search/Search';

export default function App() {

  return (
    <div className="app-root">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/restaurant" element={<RestaurantPage />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  );
}
