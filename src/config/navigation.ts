import {
  Activity, BadgeCheck, Banknote, BarChart3, Building2, Car, CircleHelp, Crown, FileText, Flag, Globe2,
  Home, Landmark, LayoutDashboard, MapPin, Newspaper, Plane, ScrollText, Settings, Shield, ShieldCheck,
  Swords, Trophy, User, Users, Wrench, Briefcase, Bell, type LucideIcon,
} from "lucide-react";
import type { Panel } from "@/lib/domain/permissions";

export interface NavItem {
  /** "" = panel home; otherwise the section slug. */
  section: string;
  label: string;
  icon: LucideIcon;
  /** Stage in which the full feature is planned. Undefined = available now. */
  stage?: number;
  description?: string;
}

export interface PanelNav {
  panel: Panel;
  base: "/admin" | "/presidente" | "/cidadao";
  title: string;
  subtitle: string;
  sidebar: NavItem[];
  /** Mobile bottom bar (max 5). */
  bottom: NavItem[];
  /** Mobile quick-action grid on home. */
  quick: NavItem[];
}

const help: NavItem = { section: "suporte", label: "Suporte", icon: CircleHelp, stage: 14, description: "Central de ajuda e atendimento." };

export const adminNav: PanelNav = {
  panel: "admin",
  base: "/admin",
  title: "Painel Administrativo Geral",
  subtitle: "Controle total do sistema",
  sidebar: [
    { section: "", label: "Painel Principal", icon: Home },
    { section: "paises", label: "Países", icon: Flag },
    { section: "solicitacoes", label: "Solicitações", icon: BadgeCheck },
    { section: "usuarios", label: "Usuários", icon: Users },
    { section: "coordenadas", label: "Coordenadas", icon: MapPin },
    { section: "economia", label: "Economia Global", icon: Globe2, stage: 3, description: "Indicadores macroeconômicos mundiais, moedas e câmbio." },
    { section: "bancos", label: "Bancos e Financeiro", icon: Landmark, stage: 4, description: "Cadastro de bancos, contas e regulação financeira." },
    { section: "empresas", label: "Empresas", icon: Building2, stage: 6, description: "Registro e fiscalização de empresas." },
    { section: "veiculos", label: "Veículos", icon: Car, stage: 9, description: "Registro nacional de veículos e licenças." },
    { section: "documentos", label: "Documentos", icon: FileText, stage: 8, description: "Emissão de passaportes e documentos oficiais." },
    { section: "policia", label: "Polícia e Justiça", icon: ShieldCheck, stage: 11, description: "Ocorrências, processos e sistema judiciário." },
    { section: "forcas-armadas", label: "Forças Armadas", icon: Swords, stage: 12, description: "Exércitos, ranking militar e conflitos." },
    { section: "rankings", label: "Rankings", icon: Trophy, stage: 13, description: "Rankings econômico, militar e de moedas." },
    { section: "noticias", label: "Notícias", icon: Newspaper, stage: 10, description: "Publicação de notícias internacionais." },
    { section: "logs", label: "Logs do Sistema", icon: ScrollText },
    { section: "configuracoes", label: "Configurações", icon: Settings, stage: 15, description: "Configurações gerais da plataforma." },
    help,
  ],
  bottom: [
    { section: "", label: "Início", icon: Home },
    { section: "paises", label: "Países", icon: Flag },
    { section: "solicitacoes", label: "Pedidos", icon: BadgeCheck },
    { section: "usuarios", label: "Usuários", icon: Users },
  ],
  quick: [],
};

export const presidentNav: PanelNav = {
  panel: "presidente",
  base: "/presidente",
  title: "Painel Presidencial",
  subtitle: "Gerencie seu país e tome decisões importantes",
  sidebar: [
    { section: "", label: "Meu País", icon: Flag },
    { section: "economia", label: "Economia", icon: BarChart3, stage: 3, description: "PIB, inflação, salário mínimo e impostos." },
    { section: "governo", label: "Governo", icon: Landmark, stage: 7, description: "Leis, decretos e eleições." },
    { section: "ministerios", label: "Ministérios", icon: Building2, stage: 7, description: "Criação e gestão de ministérios." },
    { section: "banco-central", label: "Banco Central", icon: Banknote, stage: 4, description: "Moeda nacional, juros e reservas." },
    { section: "forcas-armadas", label: "Forças Armadas", icon: Swords, stage: 12, description: "Defesa nacional e efetivo militar." },
    { section: "empresas", label: "Empresas Nacionais", icon: Briefcase, stage: 6, description: "Empresas registradas no país." },
    { section: "infraestrutura", label: "Infraestrutura", icon: Wrench, stage: 9, description: "Obras, transportes e energia." },
    { section: "relatorios", label: "Relatórios", icon: FileText, stage: 13, description: "Relatórios nacionais e exportações." },
    { section: "noticias", label: "Notícias", icon: Newspaper, stage: 10, description: "Notícias oficiais do governo." },
    { section: "configuracoes", label: "Configurações", icon: Settings, stage: 15, description: "Preferências do governo." },
    help,
  ],
  bottom: [
    { section: "", label: "Meu País", icon: Flag },
    { section: "economia", label: "Economia", icon: BarChart3, stage: 3 },
    { section: "governo", label: "Governo", icon: Landmark, stage: 7 },
    { section: "relatorios", label: "Relatórios", icon: FileText, stage: 13 },
  ],
  quick: [],
};

export const citizenNav: PanelNav = {
  panel: "cidadao",
  base: "/cidadao",
  title: "Meu Painel",
  subtitle: "Sua vida no mundo de World Economy",
  sidebar: [
    { section: "", label: "Meu Painel", icon: LayoutDashboard },
    { section: "conta", label: "Minha Conta", icon: User, stage: 2, description: "Perfil, avatar e segurança da conta." },
    { section: "pais", label: "Meu País", icon: Flag },
    { section: "banco", label: "Banco", icon: Landmark, stage: 4, description: "Conta bancária, extrato e transferências." },
    { section: "empregos", label: "Empregos", icon: Briefcase, stage: 6, description: "Emprego atual, cargo e empresas." },
    { section: "viagens", label: "Viagens", icon: Plane, stage: 9, description: "Viagens internacionais e vistos." },
    { section: "veiculos", label: "Veículos", icon: Car, stage: 9, description: "Veículos registrados e carteira de motorista." },
    { section: "documentos", label: "Documentos", icon: FileText, stage: 8, description: "Identidade, passaporte e certidões." },
    { section: "policia", label: "Polícia", icon: Shield, stage: 11, description: "Antecedentes e ocorrências." },
    { section: "noticias", label: "Notícias", icon: Newspaper, stage: 10, description: "Notícias nacionais e internacionais." },
    { section: "notificacoes", label: "Notificações", icon: Bell, stage: 2, description: "Avisos do governo e do sistema." },
    { section: "configuracoes", label: "Configurações", icon: Settings, stage: 15, description: "Preferências do aplicativo." },
    help,
  ],
  bottom: [
    { section: "", label: "Início", icon: Home },
    { section: "pais", label: "País", icon: Flag },
    { section: "noticias", label: "Notícias", icon: Newspaper, stage: 10 },
    { section: "conta", label: "Perfil", icon: User, stage: 2 },
  ],
  quick: [
    { section: "pais", label: "País", icon: Flag },
    { section: "banco", label: "Banco", icon: Landmark, stage: 4 },
    { section: "empregos", label: "Empresas", icon: Building2, stage: 6 },
    { section: "viagens", label: "Viagens", icon: Plane, stage: 9 },
    { section: "documentos", label: "Documentos", icon: FileText, stage: 8 },
    { section: "veiculos", label: "Veículos", icon: Car, stage: 9 },
    { section: "policia", label: "Polícia", icon: Shield, stage: 11 },
    { section: "noticias", label: "Notícias", icon: Newspaper, stage: 10 },
  ],
};

export const panelNavs = { admin: adminNav, presidente: presidentNav, cidadao: citizenNav } as const;

export function findSection(nav: PanelNav, section: string): NavItem | undefined {
  return nav.sidebar.find((i) => i.section === section);
}

export const roleLabel = { superadmin: "Super Admin", presidente: "Presidente", cidadao: "Cidadão" } as const;
export { Crown, Activity };
