import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  images: {
    domains: ['drive.google.com'],
  },
  webpack: (config) => {
    config.resolve.alias['public'] = path.join(__dirname, 'public');
    return config;
  },
};
