import { describe, it } from "vitest";
import { ResolvedSchema, SchemaInput, resolveSchema } from "./schema";
import { extendScope, AbiTypeScope } from "./scope";
import { attest } from "@arktype/attest";

describe("resolveSchema", () => {
  it("should map user types to their primitive type", () => {
    const scope = extendScope(AbiTypeScope, { CustomType: "address" });
    const resolved = resolveSchema({ regular: "uint256", user: "CustomType" }, scope);
    const expected = {
      regular: {
        type: "uint256",
        internalType: "uint256",
      },
      user: {
        type: "address",
        internalType: "CustomType",
      },
    } as const;

    attest<typeof expected>(resolved)
      .equals(expected)
      .type.toString.snap(
        '{ readonly regular: { readonly type: "uint256"; readonly internalType: "uint256"; }; readonly user: { readonly type: "address"; readonly internalType: "CustomType"; }; }',
      );
  });

  it("should throw if a type is not part of the scope", () => {
    const scope = extendScope(AbiTypeScope, { CustomType: "address" });
    attest(() =>
      resolveSchema(
        {
          regular: "uint256",
          // @ts-expect-error Type '"NotACustomType"' is not assignable to type 'AbiType | "CustomType"'.
          user: "NotACustomType",
        },
        scope,
      ),
    ).throws(`"NotACustomType" is not a valid type in this scope.`);
    // TODO: narrow this error
    // .type.errors(`Type '"NotACustomType"' is not assignable to type 'AbiType | "CustomType"'.`);
  });
});

describe("SchemaInput", () => {
  it("should be extendable by narrow types", () => {
    const scope = extendScope(AbiTypeScope, { CustomType: "address" });
    attest<SchemaInput<typeof scope> extends SchemaInput ? true : false, true>();
  });
});

describe("ResolvedSchema", () => {
  it("should be extendable by narrow types", () => {
    const scope = extendScope(AbiTypeScope, { CustomType: "address" });
    attest<ResolvedSchema<{ x: "CustomType" }, typeof scope> extends ResolvedSchema ? true : false, true>();
  });
});
