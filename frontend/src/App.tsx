import { Route, Routes } from 'react-router-dom'
import Dashboard from './Dashboard';

export default function App() {

  return (
    <div className="app-root">
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
