import type { Metadata } from 'next'
import { AuthForm } from './auth-form/AuthForm'

export const metadata: Metadata = {
	title: 'Login'
}

export default function LoginPage() {
	return (
		<div className="h-full flex items-center justify-center">
			<div className="h-full rounded-lg shadow-md">
				<AuthForm isLogin />
			</div>
		</div>
	)
}
