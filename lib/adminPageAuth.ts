import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { isValidAdminToken } from '@/lib/adminAuth'

export async function requireAdminSession(): Promise<void> {
  const cookieStore = await cookies()
  if (!isValidAdminToken(cookieStore.get('admin_session')?.value)) {
    redirect('/admin/login')
  }
}
