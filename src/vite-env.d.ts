/// <reference types="vite/client" />

// Declaração explícita para importação de arquivos de vídeo MP4
declare module "*.mp4" {
  const src: string;
  export default src;
}
