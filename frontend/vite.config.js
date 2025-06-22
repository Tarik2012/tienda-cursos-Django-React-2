import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/tienda-cursos-Django-React-2/", // 👈 muy importante
  plugins: [react(), tailwindcss()],
});
