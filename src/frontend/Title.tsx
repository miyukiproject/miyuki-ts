import React from "react"

export function ContentTitle({ children }: { children: React.ReactNode }) {
  return <h1 className="text-4xl leading-5 mt-[10px] mb-[15px]">{children}</h1>
}

export function ContentChildrenTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-[2.5rem]">{children}</h2>
}

export function ContentChildTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-[2rem]">{children}</h3>
}