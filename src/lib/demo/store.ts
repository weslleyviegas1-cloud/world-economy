import { useSyncExternalStore } from "react";
import type { Account, AdminLog, Coordinates, Country, PresidencyRequest } from "@/lib/domain/types";
import { seedAccounts, seedCountries, seedLogs, seedRequests } from "./seed";

/**
 * Local demonstration store (localStorage). Mirrors the shape of the future
 * database so screens can switch to real queries without layout changes.
 */
export interface DemoState {
  sessionId: string | null;
  accounts: Account[];
  countries: Country[];
  requests: PresidencyRequest[];
  logs: AdminLog[];
  serverCoords: Coordinates;
}

const KEY = "world-economy-demo-v1";
const initial: DemoState = {
  sessionId: null,
  accounts: seedAccounts,
  countries: seedCountries,
  requests: seedRequests,
  logs: seedLogs,
  serverCoords: { x: 0, y: 64, z: 0 },
};

let state: DemoState = initial;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) state = { ...initial, ...JSON.parse(raw) };
  } catch {
    state = initial;
  }
}

function emit() {
  if (typeof window !== "undefined") window.localStorage.setItem(KEY, JSON.stringify(state));
  listeners.forEach((l) => l());
}

export function setState(fn: (s: DemoState) => DemoState) {
  load();
  state = fn(state);
  emit();
}

export function getState() {
  load();
  return state;
}

export function useDemo<T>(select: (s: DemoState) => T): T {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => select(getState()),
    () => select(initial),
  );
}

export function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function resetDemo() {
  state = { ...initial };
  emit();
}

const log = (s: DemoState, actor: string, action: string): AdminLog[] => [
  { id: crypto.randomUUID(), at: new Date().toISOString(), actor, action },
  ...s.logs,
];

export function newPlayerId(existing: Account[]): string {
  const used = new Set(existing.map((a) => a.playerId));
  let id = "";
  do id = `#${Math.floor(10000 + Math.random() * 89999)}`;
  while (used.has(id));
  return id;
}

/* ---------- actions ---------- */
export const demoActions = {
  signInAs(accountId: string) {
    setState((s) => ({ ...s, sessionId: accountId }));
  },
  signOut() {
    setState((s) => ({ ...s, sessionId: null }));
  },
  signInByEmail(email: string): Account | null {
    const acc = getState().accounts.find((a) => a.email.toLowerCase() === email.toLowerCase()) ?? null;
    if (acc) setState((s) => ({ ...s, sessionId: acc.id }));
    return acc;
  },
  register(nickname: string, email: string): Account {
    const s = getState();
    const acc: Account = {
      id: crypto.randomUUID(),
      playerId: newPlayerId(s.accounts),
      nickname,
      email,
      roles: [],
      status: "pendente_registro",
      countryId: null,
      createdAt: new Date().toISOString(),
    };
    setState((st) => ({ ...st, accounts: [...st.accounts, acc], sessionId: acc.id, logs: log(st, "Sistema", `Novo cadastro: ${nickname}`) }));
    return acc;
  },
  chooseCitizenship(accountId: string, countryId: string) {
    setState((s) => ({
      ...s,
      accounts: s.accounts.map((a) => (a.id === accountId ? { ...a, roles: ["cidadao"], status: "ativo", countryId } : a)),
    }));
  },
  requestPresidency(accountId: string, countryId: string) {
    setState((s) => {
      const acc = s.accounts.find((a) => a.id === accountId);
      const country = s.countries.find((c) => c.id === countryId);
      return {
        ...s,
        accounts: s.accounts.map((a) => (a.id === accountId ? { ...a, roles: ["presidente"], status: "pendente_presidencia", countryId } : a)),
        requests: [...s.requests, { id: crypto.randomUUID(), accountId, countryId, status: "pendente", createdAt: new Date().toISOString() }],
        logs: log(s, "Sistema", `Solicitação de presidência: ${acc?.nickname} → ${country?.name}`),
      };
    });
  },
  decideRequest(requestId: string, approve: boolean) {
    setState((s) => {
      const req = s.requests.find((r) => r.id === requestId);
      if (!req) return s;
      const acc = s.accounts.find((a) => a.id === req.accountId);
      const country = s.countries.find((c) => c.id === req.countryId);
      return {
        ...s,
        requests: s.requests.map((r) => (r.id === requestId ? { ...r, status: approve ? "aprovada" : "recusada" } : r)),
        accounts: s.accounts.map((a) =>
          a.id === req.accountId
            ? approve
              ? { ...a, status: "ativo" }
              : { ...a, roles: [], status: "pendente_registro", countryId: null }
            : a,
        ),
        countries: approve
          ? s.countries.map((c) => (c.id === req.countryId ? { ...c, presidentId: req.accountId, acceptsPresident: false } : c))
          : s.countries,
        logs: log(s, "AdminGlobal", `${approve ? "Aprovou" : "Recusou"} ${acc?.nickname} para presidência de ${country?.name}`),
      };
    });
  },
  upsertCountry(country: Country) {
    setState((s) => {
      const exists = s.countries.some((c) => c.id === country.id);
      return {
        ...s,
        countries: exists ? s.countries.map((c) => (c.id === country.id ? country : c)) : [...s.countries, country],
        logs: log(s, "AdminGlobal", `${exists ? "Editou" : "Cadastrou"} o país ${country.name}`),
      };
    });
  },
  setServerCoords(coords: Coordinates) {
    setState((s) => ({ ...s, serverCoords: coords, logs: log(s, "AdminGlobal", `Definiu coordenadas globais do servidor`) }));
  },
  setAccountStatus(accountId: string, status: Account["status"]) {
    setState((s) => ({
      ...s,
      accounts: s.accounts.map((a) => (a.id === accountId ? { ...a, status } : a)),
      logs: log(s, "AdminGlobal", `Alterou status de conta para ${status}`),
    }));
  },
};

export function useSession(): Account | null {
  return useDemo((s) => s.accounts.find((a) => a.id === s.sessionId) ?? null);
}
