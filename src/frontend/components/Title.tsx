import React from "react"

export function Heading1({ children }: { children: React.ReactNode }) {
  return <h1 className="text-[calc(1.425rem_+_2.1vw)] leading-[1.2] my-[10px] mx-0 font-[500]">{children}</h1>
}

export function Heading2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-[calc(1.375rem_+_1.5vw)] lg:text-[2.5rem] leading-[1.2]">{children}</h2>
}

export function Heading3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-[calc(1.325rem_+_0.9vw)] lg:text-[2rem]">{children}</h3>
}