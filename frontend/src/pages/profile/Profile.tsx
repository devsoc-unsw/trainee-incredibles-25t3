"use client"

import Sidebar from "@/components/Sidebar";
import ProfilePage from "@/pages/profile/ProfilePage";

export default function Profile() {
  return (
    <div className="flex flex-row max-h-screen max-w-screen">
      <Sidebar />
      <ProfilePage />
    </div>
  );
}