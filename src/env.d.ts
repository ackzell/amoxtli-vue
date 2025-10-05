/// <reference path="../.astro/types.d.ts" />
/// <reference types="@tutorialkit/astro/types" />
/// <reference types="astro/client" />

export type ImportMeta = {
  env: {
    PUBLIC_SUPABASE_URL: string;
    PUBLIC_SUPABASE_KEY: string;
  };
};
