import { ReactNode } from "react";
import { useAppSelector } from "../store/hooks";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({
  children,
}: {
  readonly children: ReactNode;
}) {
  const user = useAppSelector((s) => s.auth.user.token);
  const router = useRouter();

  // If user is not logged in, redirect to the login page
  if (!user) {
    router.push("/login");
    return null; // You can return null or any loading indicator
  }

  // If user is logged in, render the children components
  return children;
}
