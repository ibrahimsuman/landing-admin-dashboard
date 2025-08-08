import { useUserStore } from "@/store/useUser";
import Cookies from "js-cookie";
import { useCallback } from "react";

export function useLogout() {
  const clearUser = useUserStore((state) => state.clearUser);

  const logOut = useCallback(() => {
    clearUser();
    Cookies.remove("accessToken", { path: "/" });
    window.location.href = "/";
  }, [clearUser]);

  return { logOut };
}
