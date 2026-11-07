/** Core domain types shared by every panel. Shaped to map onto real database tables in later stages. */

export type Role = "superadmin" | "presidente" | "cidadao";

/** Account lifecycle. `pendente_presidencia` waits for Super Admin approval. */
export type AccountStatus = "ativo" | "pendente_registro" | "pendente_presidencia" | "suspenso";

export interface Coordinates {
  x: number;
  y: number;
  z: number;
}

export interface Country {
  id: string;
  /** ISO 3166-1 alpha-2 code, used for the flag image. */
  code: string;
  name: string;
  status: "ativo" | "suspenso";
  /** Official teleport coordinates set by the Super Admin. */
  officialCoords: Coordinates | null;
  /** Spawn ("nascimento") coordinates for new citizens. */
  spawnCoords: Coordinates | null;
  acceptsPresident: boolean;
  acceptsCitizens: boolean;
  presidentId: string | null;
}

export interface Account {
  id: string;
  /** Unique public player id, e.g. "#1024". */
  playerId: string;
  nickname: string;
  email: string;
  roles: Role[];
  status: AccountStatus;
  countryId: string | null;
  createdAt: string;
}

export interface PresidencyRequest {
  id: string;
  accountId: string;
  countryId: string;
  status: "pendente" | "aprovada" | "recusada";
  createdAt: string;
}

export interface AdminLog {
  id: string;
  at: string;
  actor: string;
  action: string;
}
