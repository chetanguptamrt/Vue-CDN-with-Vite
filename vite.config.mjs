import VueDevtools from 'vite-plugin-vue-devtools'
import { defineConfig, loadEnv } from 'vite';
import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from 'url';
import { createHtmlPlugin } from "vite-plugin-html";

export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), 'VUE_APP_')

    if (command === 'serve' && env.VUE_APP_ENV !== 'development') {
        throw new Error('You are doing something wrong; you can only serve in a development environment.')
    }

    const isProductionBuild = !['development', 'test'].includes(env.VUE_APP_ENV)

    return {
        define: {
            'process.env': env
        },
        resolve: {
            alias: [
                { find: '@vue-router', replacement: fileURLToPath(new URL('./src/assets/libraries/vue-router@4.4.0.global.js', import.meta.url)) },
                { find: '@vee-validate', replacement: fileURLToPath(new URL('./src/assets/libraries/vee-validate@4.13.2.js', import.meta.url)) },
                { find: '@axios', replacement: fileURLToPath(new URL('./src/assets/libraries/axios@1.7.2.js', import.meta.url)) },
            ]
        },
        plugins: [
            vue(),
            VueDevtools(),
            createHtmlPlugin({
                minify: true,
                inject: {
                    data: {
                        cdnScript: `<script src="/js/vue@3.4.34.global${isProductionBuild ? '.prod' : ''}.js"></script>`,
                    },
                },
            }),
        ],
        server: {
            open: env.VUE_APP_DOMAIN,
            port: env.VUE_APP_PORT,
            strictPort: true,
        },
        esbuild: {
            minify: true
        },
        build: {
            target: 'esnext',
            minify: 'terser',
            terserOptions: {
                compress: {
                    drop_debugger: true,
                    drop_console: true,
                },
                mangle: true,
                output: {
                    comments: false,
                },
            },
            rollupOptions: {
                output: {
                    entryFileNames: `assets/[hash:22]-${Date.now()}.js`,
                    chunkFileNames: `assets/[hash:22].js`,
                    assetFileNames: `assets/[hash:22].[ext]`
                }
            }
        }
    }
});