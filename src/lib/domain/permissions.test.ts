import { describe, expect, it } from "vitest";
import {
  canAccessPanel,
  canManageCountry,
  formatTpCommand,
  presidencyOptionAvailable,
} from "./permissions";
import type { Account, Country } from "./types";

const base: Account = {
  id: "u1",
  playerId: "#1024",
  nickname: "Wesley",
  email: "w@x.com",
  roles: ["cidadao"],
  status: "ativo",
  countryId: "br",
  createdAt: "",
};
const country = (o: Partial<Country>): Country => ({
  id: "br",
  code: "br",
  name: "Brasil",
  status: "ativo",
  officialCoords: null,
  spawnCoords: null,
  acceptsPresident: true,
  acceptsCitizens: true,
  presidentId: null,
  ...o,
});

describe("panel permissions", () => {
  it("citizen cannot open admin or president panels", () => {
    expect(canAccessPanel(base, "cidadao")).toBe(true);
    expect(canAccessPanel(base, "admin")).toBe(false);
    expect(canAccessPanel(base, "presidente")).toBe(false);
  });
  it("pending presidency request does not grant president panel", () => {
    const pending = { ...base, roles: ["presidente" as const], status: "pendente_presidencia" as const };
    expect(canAccessPanel(pending, "presidente")).toBe(false);
  });
  it("president manages only own country", () => {
    const pres = { ...base, roles: ["presidente" as const] };
    expect(canManageCountry(pres, country({ presidentId: "u1" }))).toBe(true);
    expect(canManageCountry(pres, country({ presidentId: "other" }))).toBe(false);
  });
});

describe("presidency option", () => {
  it("disappears when no country has a free presidential seat", () => {
    expect(presidencyOptionAvailable([country({ presidentId: "x" }), country({ acceptsPresident: false })])).toBe(false);
    expect(presidencyOptionAvailable([country({})])).toBe(true);
  });
  it("suspended countries do not count", () => {
    expect(presidencyOptionAvailable([country({ status: "suspenso" })])).toBe(false);
  });
});

it("formats teleport command as /tp X Y Z", () => {
  expect(formatTpCommand({ x: -125, y: 64, z: 320 })).toBe("/tp -125 64 320");
});
