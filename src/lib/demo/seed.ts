import type { Account, AdminLog, Country, PresidencyRequest } from "@/lib/domain/types";

/**
 * DEMONSTRAÇÃO — dados locais apenas para visualizar a interface na Etapa 1.
 * Serão substituídos pelo banco de dados real nas próximas etapas.
 */

const c = (
  id: string,
  name: string,
  o: Partial<Country> = {},
): Country => ({
  id,
  code: id,
  name,
  status: "ativo",
  officialCoords: null,
  spawnCoords: null,
  acceptsPresident: true,
  acceptsCitizens: true,
  presidentId: null,
  ...o,
});

export const seedCountries: Country[] = [
  c("br", "Brasil", {
    presidentId: "acc-pres",
    acceptsPresident: false,
    officialCoords: { x: -125, y: 64, z: 320 },
    spawnCoords: { x: -130, y: 64, z: 310 },
  }),
  c("us", "Estados Unidos"),
  c("cn", "China"),
  c("de", "Alemanha"),
  c("jp", "Japão"),
  c("fr", "França"),
  c("gb", "Reino Unido"),
  c("it", "Itália"),
  c("es", "Espanha"),
  c("ca", "Canadá"),
  c("ar", "Argentina"),
  c("pt", "Portugal", { status: "suspenso", acceptsCitizens: false, acceptsPresident: false }),
];

export const seedAccounts: Account[] = [
  {
    id: "acc-admin",
    playerId: "#0001",
    nickname: "AdminGlobal",
    email: "admin@demo.worldeconomy",
    roles: ["superadmin"],
    status: "ativo",
    countryId: null,
    createdAt: "2026-11-01T10:00:00Z",
  },
  {
    id: "acc-pres",
    playerId: "#0002",
    nickname: "PresidenteBR",
    email: "presidente@demo.worldeconomy",
    roles: ["presidente"],
    status: "ativo",
    countryId: "br",
    createdAt: "2026-11-02T10:00:00Z",
  },
  {
    id: "acc-cit",
    playerId: "#1024",
    nickname: "WesleyViegas",
    email: "cidadao@demo.worldeconomy",
    roles: ["cidadao"],
    status: "ativo",
    countryId: "br",
    createdAt: "2026-11-03T10:00:00Z",
  },
  {
    id: "acc-req",
    playerId: "#3310",
    nickname: "LiderDoNorte",
    email: "lider@demo.worldeconomy",
    roles: ["presidente"],
    status: "pendente_presidencia",
    countryId: "ca",
    createdAt: "2026-11-06T18:20:00Z",
  },
];

export const seedRequests: PresidencyRequest[] = [
  { id: "req-1", accountId: "acc-req", countryId: "ca", status: "pendente", createdAt: "2026-11-06T18:20:00Z" },
];

export const seedLogs: AdminLog[] = [
  { id: "l1", at: "2026-11-07T09:12:00Z", actor: "AdminGlobal", action: "Atualizou coordenadas oficiais de Brasil" },
  { id: "l2", at: "2026-11-06T18:20:00Z", actor: "Sistema", action: "Nova solicitação de presidência: LiderDoNorte → Canadá" },
  { id: "l3", at: "2026-11-02T10:00:00Z", actor: "AdminGlobal", action: "Aprovou PresidenteBR como presidente de Brasil" },
];

export interface DemoNews {
  id: string;
  title: string;
  summary: string;
  scope: "global" | "nacional";
  countryId?: string;
  time: string;
  image: "globe" | "city" | "president";
}

export const demoNews: DemoNews[] = [
  { id: "n1", scope: "global", title: "Servidor WORLD ECONOMY aberto para novos países", summary: "Presidentes já podem solicitar a liderança de nações disponíveis.", time: "Hoje, 09:15", image: "globe" },
  { id: "n2", scope: "global", title: "Novas regras de cidadania publicadas", summary: "Jogadores escolhem sua nacionalidade logo após o cadastro.", time: "Hoje, 08:50", image: "city" },
  { id: "n3", scope: "global", title: "Sistema bancário chega em breve", summary: "Contas e transferências serão liberadas nas próximas etapas.", time: "Ontem, 21:26", image: "president" },
  { id: "n4", scope: "nacional", countryId: "br", title: "Brasil define coordenadas oficiais da capital", summary: "Cidadãos já podem se teletransportar para o país.", time: "Hoje, 10:20", image: "president" },
];
