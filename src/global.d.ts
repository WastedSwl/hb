///<reference types="react-scripts" />
declare global {
  interface Window {
    particlesJS: {
      load: (tagId: string, path: string, callback: () => void) => void;
    };
  }
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

export {};
