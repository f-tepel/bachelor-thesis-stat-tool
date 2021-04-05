type MathBasic =  {
  erf: Function
}

declare module 'mathjs' {
  export function create(): MathBasic
} 
