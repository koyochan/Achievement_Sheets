import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false, // Baseスタイルの二重適用を防ぐ
    }),
    react(), // React インテグレーションを追加
  ],
});