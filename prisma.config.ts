import { defineConfig } from '@prisma/config';
import { config } from 'dotenv';

// .envファイルを強制的に読み込む
config();

export default defineConfig({
  migrations: {
    // 以前のログで tsx が使われていたため、npx tsx を指定します
    seed: 'npx tsx prisma/seed.ts',
  },
  datasource: {
    url: process.env.DATABASE_URL!,
  },
});