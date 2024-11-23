import Image from 'next/image'
import { useRouter } from 'next/navigation'

export function SocialMediaButtons() {
	const router = useRouter()

	return (
		<>
		<p className='text-center mb-2 pb-7 font-bold text-2xl'>Войти с помощью</p>
		<div className="grid grid-cols-2 gap-4">
			
			<button
				onClick={() => router.push('/auth/yandex')}
				className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
				type="button"
			>
				<Image
					src="/yandex.svg"
					width={15}
					height={15}
					alt="yandex auth"
					className="w-8 h-8 mr-2"
				/>
			</button>
			<button
				onClick={() => router.push('/auth/github')}
				className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
				type="button"
			>
				<Image
					src="/tg.svg"
					width={15}
					height={15}
					alt="github auth"
					className="w-8 h-8 mr-2"
				/>
			</button>
		</div>
		</>
	)
}
