'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import cn from 'clsx'
import { useTransition } from 'react'
import toast from 'react-hot-toast'

import { PUBLIC_PAGES } from '@/config/pages/public.config'
import authService from '@/services/auth/auth.service'


export function LogoutButton() {
  const { replace } = useRouter()

  const queryClient = useQueryClient()

  const [isPending, startTransition] = useTransition()

  const { mutate: mutateLogout, isPending: isLogoutPending } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authService.logout(),
    onSuccess() {
      startTransition(() => {
        startTransition(() => {
          replace(PUBLIC_PAGES.LOGIN)
        })
      })
      queryClient.removeQueries({ queryKey: ['new tokens'], exact: true })
      queryClient.removeQueries({ queryKey: ['profile'], exact: true })
    },
    onError(error) {
      toast.error('При выходе произошла ошибка')
    }
  })

  const isLogoutLoading = isLogoutPending || isPending

  return (
    <div className="hover:opacity-80">
      <button onClick={() => mutateLogout()} disabled={isLogoutLoading}>
        <div className="flex justify-center items-center gap-2">
        <div className=" mt-4 w-10 h-10 flex justify-center items-center  text-white bg-white/20 rounded ">
          <LogOut />
        </div>
        </div>
      </button>
    </div>
  )
}