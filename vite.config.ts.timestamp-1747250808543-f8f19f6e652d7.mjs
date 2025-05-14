// vite.config.ts
import react from "file:///home/alec/code/LenderApp/node_modules/@vitejs/plugin-react/dist/index.mjs";
import laravel from "file:///home/alec/code/LenderApp/node_modules/laravel-vite-plugin/dist/index.js";
import { resolve } from "node:path";
import { defineConfig } from "file:///home/alec/code/LenderApp/node_modules/vite/dist/node/index.js";
import tailwindcss from "file:///home/alec/code/LenderApp/node_modules/tailwindcss/lib/index.js";
import autoprefixer from "file:///home/alec/code/LenderApp/node_modules/autoprefixer/lib/autoprefixer.js";
var __vite_injected_original_dirname = "/home/alec/code/LenderApp";
var vite_config_default = defineConfig({
  plugins: [
    laravel({
      input: ["resources/js/app.jsx"],
      ssr: "resources/js/ssr.jsx",
      refresh: true
    }),
    react()
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer
      ]
    }
  },
  esbuild: {
    jsx: "automatic"
  },
  resolve: {
    alias: {
      "ziggy-js": resolve(__vite_injected_original_dirname, "vendor/tightenco/ziggy")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9hbGVjL2NvZGUvTGVuZGVyQXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9hbGVjL2NvZGUvTGVuZGVyQXBwL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2FsZWMvY29kZS9MZW5kZXJBcHAvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IGxhcmF2ZWwgZnJvbSAnbGFyYXZlbC12aXRlLXBsdWdpbic7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAnbm9kZTpwYXRoJztcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHRhaWx3aW5kY3NzIGZyb20gJ3RhaWx3aW5kY3NzJztcbmltcG9ydCBhdXRvcHJlZml4ZXIgZnJvbSAnYXV0b3ByZWZpeGVyJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICAgIGxhcmF2ZWwoe1xuICAgICAgICAgICAgaW5wdXQ6IFsgJ3Jlc291cmNlcy9qcy9hcHAuanN4J10sXG4gICAgICAgICAgICBzc3I6ICdyZXNvdXJjZXMvanMvc3NyLmpzeCcsXG4gICAgICAgICAgICByZWZyZXNoOiB0cnVlLFxuICAgICAgICB9KSxcbiAgICAgICAgcmVhY3QoKSxcbiAgICBdLFxuICAgIGNzczoge1xuICAgICAgICBwb3N0Y3NzOiB7XG4gICAgICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAgICAgICAgdGFpbHdpbmRjc3MsXG4gICAgICAgICAgICAgICAgYXV0b3ByZWZpeGVyLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIGVzYnVpbGQ6IHtcbiAgICAgICAganN4OiAnYXV0b21hdGljJyxcbiAgICB9LFxuICAgIHJlc29sdmU6IHtcbiAgICAgICAgYWxpYXM6IHtcbiAgICAgICAgICAgICd6aWdneS1qcyc6IHJlc29sdmUoX19kaXJuYW1lLCAndmVuZG9yL3RpZ2h0ZW5jby96aWdneScpLFxuICAgICAgICB9LFxuICAgIH0sXG59KTsiXSwKICAibWFwcGluZ3MiOiAiO0FBQTZQLE9BQU8sV0FBVztBQUMvUSxPQUFPLGFBQWE7QUFDcEIsU0FBUyxlQUFlO0FBQ3hCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8saUJBQWlCO0FBQ3hCLE9BQU8sa0JBQWtCO0FBTHpCLElBQU0sbUNBQW1DO0FBT3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQ3hCLFNBQVM7QUFBQSxJQUNMLFFBQVE7QUFBQSxNQUNKLE9BQU8sQ0FBRSxzQkFBc0I7QUFBQSxNQUMvQixLQUFLO0FBQUEsTUFDTCxTQUFTO0FBQUEsSUFDYixDQUFDO0FBQUEsSUFDRCxNQUFNO0FBQUEsRUFDVjtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0QsU0FBUztBQUFBLE1BQ0wsU0FBUztBQUFBLFFBQ0w7QUFBQSxRQUNBO0FBQUEsTUFDSjtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDTCxLQUFLO0FBQUEsRUFDVDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ0gsWUFBWSxRQUFRLGtDQUFXLHdCQUF3QjtBQUFBLElBQzNEO0FBQUEsRUFDSjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
