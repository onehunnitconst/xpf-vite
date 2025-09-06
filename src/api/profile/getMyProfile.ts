import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../axios";
import { getAccessToken } from "@/utils/session-storage";
import { useMemo } from "react";
import type { Profile } from "@/types/profile/profile";

export function useGetMyProfile() {
  const {
    data: profile,
    isLoading: profileLoading,
    error: profileError,
  } = useQuery({
    queryKey: ["profiles", "me"],
    queryFn: () => {
      const accessToken = getAccessToken();

      return axiosInstance.get("/profiles/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    },
  });

  const memoized = useMemo(
    () => ({
      profile: profile?.data as Profile,
      profileLoading,
      profileError,
      profileLoaded: !profileLoading && !profileError,
      profileNotLoaded: !!(profileLoading || profileError),
    }),
    [profile, profileLoading, profileError]
  );

  return memoized;
}
