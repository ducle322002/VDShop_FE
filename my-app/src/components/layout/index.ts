// Layout Components
export { default as Header } from './Header';
export { default as Footer } from './Footer';
export { default as Sidebar } from './Sidebar';
export { default as MainLayout } from './MainLayout';
export { default as PageContainer } from './PageContainer';

// Layout Types
export interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  showSidebar?: boolean;
}

export interface HeaderProps {
  onMenuToggle?: () => void;
  onCartToggle?: () => void;
  onSearch?: (query: string) => void;
}

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: SidebarItem[];
}

export interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  children?: SidebarItem[];
  badge?: string | number;
}

export interface FooterProps {
  links: FooterLink[];
  socialLinks: SocialLink[];
  copyright: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  href: string;
  icon: React.ReactNode;
}
