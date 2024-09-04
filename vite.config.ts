import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as path from 'path'; // yarn add @types/node
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:{
      "@": path.resolve(__dirname,"./src"),
      "@components": path.resolve(__dirname,"./src/components"),
      "@views": path.resolve(__dirname,"./src/views"),
      "@assets": path.resolve(__dirname,"./src/assets"),
      "@hooks": path.resolve(__dirname,"./src/hooks"),
      "@routes": path.resolve(__dirname,"./src/routes"),
      "@toolbox": path.resolve(__dirname,"./src/toolbox"),
      "@constants": path.resolve(__dirname,"./src/toolbox/constants"),
      "@helpers": path.resolve(__dirname,"./src/toolbox/helpers"),
    }
  }
})
