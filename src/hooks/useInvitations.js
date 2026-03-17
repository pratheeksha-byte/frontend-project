import { useQuery } from "@tanstack/react-query";
import { fetchInvitations } from "../api/invitationsApi";

export const useInvitations = () => {
  return useQuery({
    queryKey: ["invitations"],
    queryFn: fetchInvitations,
    refetchInterval: 10000,
  });
};