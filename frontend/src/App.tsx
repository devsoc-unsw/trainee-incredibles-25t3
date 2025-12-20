import { Route, Routes } from 'react-router-dom'
import Dashboard from '@/pages/dashboard/Dashboard';
import RestaurantPage from '@/pages/restaurantPage/RestaurantPage';

export default function App() {

  return (
    <div className="app-root">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/" element={<RestaurantPage />} />
      </Routes>
    </div>
  );
}
