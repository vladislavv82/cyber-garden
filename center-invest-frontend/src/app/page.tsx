import { ProfileInfo } from '@/app/ProfileInfo'
import { protectPage } from '@/utils/server/protect-page'

async function HomePage() {
	await protectPage()

	return (
		<div>
			<h1 className="mt-4">Home Page</h1>
			<p>(only for loggedIn user)</p>
			<br />
			<p>Для проверки прав, есть страницы: /premium, /admin, /manager</p>

			<ProfileInfo />
		</div>
	)
}

export default HomePage
