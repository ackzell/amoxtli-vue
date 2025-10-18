/// <reference path="../.astro/types.d.ts" />
/// <reference types="@tutorialkit/astro/types" />
/// <reference types="astro/client" />

declare module 'react' {
  namespace JSX {
    interface IntrinsicAttributes {
      'client:only'?: string;
      'client:load'?: boolean;
      'client:idle'?: boolean;
      'client:visible'?: boolean;
      'client:media'?: string;
    }
  }
}

export type ImportMeta = {
  env: {
    PUBLIC_SUPABASE_URL: string;
    PUBLIC_SUPABASE_KEY: string;
  };
};
