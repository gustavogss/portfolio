/// <reference types="vite/client" />

declare module '*?format=webp' {
  const src: string;
  export default src;
}

declare module '*?format=avif' {
  const src: string;
  export default src;
}

declare module '*?format=webp&as=url' {
  const src: string;
  export default src;
}

declare module '*?format=avif&as=url' {
  const src: string;
  export default src;
}

declare module '*?as=metadata' {
  const metadata: any;
  export default metadata;
}
