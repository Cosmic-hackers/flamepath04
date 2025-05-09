"use client"

import dynamic from "next/dynamic"
import type { ComponentType } from "react"

// This is a client component wrapper for dynamic imports with ssr: false
export function clientDynamicImport<P>(importFunc: () => Promise<{ default: ComponentType<P> }>) {
  return dynamic(importFunc, { ssr: false })
}
