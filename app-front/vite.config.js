import {defineConfig} from 'vite'
import react from '@vite/plugin-react'

export default defineConfig({
    puglins: [react()],
    base: "/trabalho-csharp",
})