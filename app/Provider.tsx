"use client";

import Loader from "@/components/Loader";
import { LiveblocksProvider, ClientSideSuspense } from "@liveblocks/react";
import { getClerkUsers } from "@/lib/actions/user.actions";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <LiveblocksProvider 
    authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({userIds}) =>{
        const users = await getClerkUsers({userIds})

        return users
      }}
      >
      <ClientSideSuspense fallback={<Loader />}>{children}
      </ClientSideSuspense>
    </LiveblocksProvider>
  );
};

export default Provider;
