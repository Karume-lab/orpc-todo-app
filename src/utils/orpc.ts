import type { router } from "@/server/orpc/router";
import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { RouterClient } from "@orpc/server";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";

const link = new RPCLink({
  url: `${
    typeof window !== "undefined"
      ? window.location.origin
      : "http://localhost:3000"
  }/rpc`,
  headers: async () => {
    if (typeof window !== "undefined") return {};
    const { headers } = await import("next/headers");
    return await headers();
  },
});

const client: RouterClient<typeof router> = createORPCClient(link);

export const orpcTanstackClient = createTanstackQueryUtils(client);
