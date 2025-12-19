import * as React from "react";
import { NavLink } from "react-router-dom";
import { Home, Compass, User, Search, RefreshCw } from "lucide-react";
import { Button } from "./components/ui/button";
import { cn } from "./lib/utils";

const navItems = [
  { label: "For You", to: "/", icon: Home },
  { label: "Discovery", to: "/discovery", icon: Compass },
  { label: "My Profile", to: "/profile", icon: User },
  { label: "Search", to: "/search", icon: Search },
  { label: "Random Roulette", to: "/roulette", icon: RefreshCw }
];

const Sidebar: React.FC = () => {
  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-background">
      <div className="border-b px-6 py-5">
        <h1 className="text-2xl font-semibold tracking-tight">UniBites</h1>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }: { isActive: boolean }) =>
                cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium",
                  "text-muted-foreground hover:bg-muted hover:text-foreground",
                  isActive && "bg-muted text-foreground"
                )
              }
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t px-4 py-4">
        <Button
          variant="outline"
          className="flex w-full items-center justify-start gap-2 rounded-full px-4"
        >
          <User className="h-4 w-4" />
          <span className="truncate text-sm">user@example.com</span>
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
