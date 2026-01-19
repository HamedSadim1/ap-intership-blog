/**
 * Shared TypeScript Types
 *
 * Centrale type definities die door het hele project worden gebruikt
 */

import { ReactNode } from "react";

/**
 * Common Component Props
 */

/** Base props die de meeste componenten accepteren */
export interface BaseComponentProps {
  /** Extra Tailwind CSS classes */
  className?: string;
  /** React children */
  children?: ReactNode;
}

/** Props voor componenten met optioneel icoon */
export interface WithIcon {
  /** Icon component (bijv. <HomeIcon />) */
  icon?: ReactNode;
}

/** Props voor link-achtige componenten */
export interface LinkProps {
  /** URL of pad */
  href: string;
  /** Link label */
  label: string;
  /** Open in nieuw tabblad */
  external?: boolean;
}

/**
 * Page Props Types
 */

/** Standaard page props voor Next.js app router pagina's */
export interface PageProps<T = Record<string, string>> {
  /** URL parameters */
  params: Promise<T>;
  /** Query parameters */
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

/**
 * Data Structure Types
 */

/** Generic list item type */
export interface ListItem {
  id: string | number;
  label: string;
}

/** Image data type */
export interface ImageData {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

/** Profile/User info type */
export interface ProfileInfo {
  name: string;
  role?: string;
  image?: ImageData;
  bio?: string;
}

/**
 * Form Types
 */

/** Generic form field type */
export interface FormField<T = string> {
  name: string;
  value: T;
  error?: string;
  touched?: boolean;
}

/** Form submission state */
export interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error?: string;
}

/**
 * API Response Types
 */

/** Generic API response wrapper */
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

/** Paginated response */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

/**
 * UI State Types
 */

/** Modal/Dialog state */
export interface ModalState {
  isOpen: boolean;
  title?: string;
  content?: ReactNode;
}

/** Toast/Notification type */
export interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
  duration?: number;
}

/**
 * Utility Types
 */

/** Make all properties optional */
export type Partial<T> = {
  [P in keyof T]?: T[P];
};

/** Make all properties required */
export type Required<T> = {
  [P in keyof T]-?: T[P];
};

/** Pick specific properties from a type */
export type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

/** Omit specific properties from a type */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
