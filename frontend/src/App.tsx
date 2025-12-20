import { Route, Routes } from 'react-router-dom'
import Dashboard from '@/pages/dashboard/Dashboard';
import RestaurantPage from '@/pages/restaurantPage/RestaurantPage';
import SearchPage from '@/pages/search/SearchPage';

export default function App() {

  return (
    <div className="app-root">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/restaurant" element={<RestaurantPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </div>
  );
}
