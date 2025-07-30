// Utility functions for class name management
// Using require to work around TypeScript module resolution issues

const clsx = require('clsx')
const { twMerge } = require('tailwind-merge')

export type ClassValue = string | number | boolean | undefined | null | { [key: string]: any } | ClassValue[]

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
