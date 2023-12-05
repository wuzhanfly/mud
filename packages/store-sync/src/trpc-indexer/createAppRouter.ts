import { z } from "zod";
import { QueryAdapter } from "./common";
import { isHex } from "viem";
import { initTRPC } from "@trpc/server";
import superjson from "superjson";

export const input = z.object({
  chainId: z.number(),
  address: z.string().refine(isHex).optional(),
  filters: z
    .array(
      z.object({
        tableId: z.string().refine(isHex),
        key0: z.string().refine(isHex).optional(),
        key1: z.string().refine(isHex).optional(),
      })
    )
    .default([]),
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createAppRouter() {
  const t = initTRPC.context<{ queryAdapter: QueryAdapter }>().create({
    transformer: superjson,
  });

  return t.router({
    getLogs: t.procedure.input(input).query(async (opts): ReturnType<QueryAdapter["getLogs"]> => {
      const { queryAdapter } = opts.ctx;
      const { chainId, address, filters } = opts.input;
      return queryAdapter.getLogs({ chainId, address, filters });
    }),

    findAll: t.procedure.input(input).query(async (opts): ReturnType<QueryAdapter["findAll"]> => {
      const { queryAdapter } = opts.ctx;
      const { chainId, address, filters } = opts.input;
      return queryAdapter.findAll({ chainId, address, filters });
    }),
  });
}

export type AppRouter = ReturnType<typeof createAppRouter>;
