/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />
interface ImportMetaEnv {
    readonly VITE_APP_API: string
    // 更多环境变量...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}