import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  secret: process.env.AUTH_SECRET,
  callbacks: {},
  providers: []
} satisfies NextAuthConfig
