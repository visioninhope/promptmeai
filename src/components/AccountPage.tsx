"use client";

import { useAuthStore } from "@/zustand/useAuthStore";

import ProfileComponent from "./ProfileComponent";
import PaymentsPage from "./PaymentsPage";
import AuthDataDisplay from "./AuthDataDisplay";

export default function AccountPage() {
  const uid = useAuthStore((state) => state.uid);

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto gap-4">
      <div className="px-5 text-3xl font-bold">User Profile</div>
      <AuthDataDisplay />
      <ProfileComponent />
      <PaymentsPage />
    </div>
  );
}
