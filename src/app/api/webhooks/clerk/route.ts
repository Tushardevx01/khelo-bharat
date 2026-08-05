import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { UserRole } from '@prisma/client'

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env')
  }

  const wh = new Webhook(SIGNING_SECRET)

  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', { status: 400 })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new Response('Error: Verification error', { status: 400 })
  }

  const eventType = evt.type

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name, image_url, unsafe_metadata } = evt.data

    const email = email_addresses[0]?.email_address
    const firstName = first_name || ''
    const lastName = last_name || ''
    
    // Determine role from metadata or default to ATHLETE
    const role = (unsafe_metadata?.role as UserRole) || UserRole.ATHLETE

    if (!email) {
      return new Response('Error: No email address', { status: 400 })
    }

    try {
      await prisma.user.upsert({
        where: { clerkId: id },
        update: {
          email,
          firstName,
          lastName,
          imageUrl: image_url,
          role,
        },
        create: {
          clerkId: id,
          email,
          firstName,
          lastName,
          imageUrl: image_url,
          role,
        }
      })
    } catch (error) {
      console.error('Error syncing user to database:', error)
      return new Response('Error: Database sync failed', { status: 500 })
    }
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data

    if (id) {
      try {
        await prisma.user.update({
          where: { clerkId: id },
          data: { isActive: false }
        })
      } catch (error) {
        console.error('Error soft deleting user:', error)
        // If user doesn't exist, it's fine, we catch it
      }
    }
  }

  return new Response('Webhook received', { status: 200 })
}
