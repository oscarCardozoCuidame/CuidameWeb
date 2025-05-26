// types/css-modules.d.ts o en tu archivo de tipos globales
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.desktop.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.mobile.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.css' {
  const content: string;
  export default content;
}