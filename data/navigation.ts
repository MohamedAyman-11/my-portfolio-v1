export const navigation = ["home", "about", "services", "projects", "journey", "contact"] as const;
export type NavigationId = (typeof navigation)[number];
