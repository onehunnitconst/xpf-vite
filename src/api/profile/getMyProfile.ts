import { useQuery } from "@tanstack/react-query";
import { fetcherWithAuthorization } from "../axios";
import { useMemo } from "react";
import type { Profile } from "@/types/profile/profile";

export function useGetMyProfile() {
  const {
    data: profile,
    isLoading: profileLoading,
    error: profileError,
  } = useQuery({
    queryKey: ["profiles", "me"],
    queryFn: () => fetcherWithAuthorization("/profiles/me"),
  });

  const memoized = useMemo(
    () => ({
      profile: profile as Profile,
      profileLoading,
      profileError,
      profileLoaded: !profileLoading && !profileError,
      profileNotLoaded: !!(profileLoading || profileError),
    }),
    [profile, profileLoading, profileError]
  );

  return memoized;
}
