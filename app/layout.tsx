
import { redirect } from "next/navigation";
import './globals.css'

import { cn } from "@/lib/utils"
import React from "react"
import { title } from "process"
import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import Provider from "./Provider"
import { Inter as FontSans } from "next/font/google"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: 'liveDocs',
  description: 'Your go to docs editor'
}

export default function RootLayout({ children }: {children : React.ReactNode}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {colorPrimary: "#3371FF",
          fontSize: "16px",
        },

      }}
    >
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen font-sans antialiased",
          fontSans.variable
        )}
      >
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
    </ClerkProvider>
  )
}
