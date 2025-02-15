import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  output: 'server', // サーバーモードを有効化
  integrations: [
    tailwind({
      applyBaseStyles: false, // Baseスタイルの二重適用を防ぐ
    }),
    react(), // Reactのインテグレーションを追加
  ],
});