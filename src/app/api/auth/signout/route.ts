import { NextResponse } from 'next/server'

export async function POST() {
  // Clear the authentication cookies
  const response = NextResponse.json({ message: 'Sign out successful' })
  response.cookies.set('session_token', '', { maxAge: -1, path: '/' }) // Clearing the authToken cookie
  return response
}
