import Sidebar from "@/components/Sidebar";
import { RestaurantFilterProvider } from "@/contexts/RestaurantFilterContext";
import SearchPage from "@/pages/search/SearchPage";

export default function Search() {
  return (
    <RestaurantFilterProvider>
      <div className="flex flex-row max-h-screen max-w-screen">
        <Sidebar />
        <SearchPage />
      </div>
    </RestaurantFilterProvider>
  );
}