import { RestaurantFilterProvider } from "@/contexts/RestaurantFilterContext";
import SearchPage from "@/pages/search/SearchPage";

export default function Search() {
  return (
    <RestaurantFilterProvider>
      <SearchPage />
    </RestaurantFilterProvider>
  );
}