import type { Account, Country, Role } from "./types";

export type Panel = "admin" | "presidente" | "cidadao";

/** Which role opens which panel. Each panel is exclusive to its role. */
const PANEL_ROLE: Record<Panel, Role> = {
  admin: "superadmin",
  presidente: "presidente",
  cidadao: "cidadao",
};

export function canAccessPanel(account: Account | null, panel: Panel): boolean {
  if (!account || account.status !== "ativo") return false;
  return account.roles.includes(PANEL_ROLE[panel]);
}

/** A president may only administer the country they were approved for. */
export function canManageCountry(account: Account | null, country: Country): boolean {
  if (!account || account.status !== "ativo") return false;
  if (account.roles.includes("superadmin")) return true;
  return account.roles.includes("presidente") && country.presidentId === account.id;
}

export function countriesOpenForPresident(countries: Country[]): Country[] {
  return countries.filter((c) => c.status === "ativo" && c.acceptsPresident && !c.presidentId);
}

export function countriesOpenForCitizens(countries: Country[]): Country[] {
  return countries.filter((c) => c.status === "ativo" && c.acceptsCitizens);
}

/** The "request presidency" option only exists while at least one country has a free seat. */
export function presidencyOptionAvailable(countries: Country[]): boolean {
  return countriesOpenForPresident(countries).length > 0;
}

export function homePathFor(account: Account | null): string {
  if (!account) return "/entrar";
  if (account.status === "pendente_registro") return "/registro";
  if (account.status === "pendente_presidencia") return "/registro/aguardando";
  if (account.roles.includes("superadmin")) return "/admin";
  if (account.roles.includes("presidente")) return "/presidente";
  return "/cidadao";
}

export function formatTpCommand(c: { x: number; y: number; z: number }): string {
  return `/tp ${c.x} ${c.y} ${c.z}`;
}
