import { axiosClassic, instance } from '@/api/axios'
import { TypeUserForm } from '@/types/auth.types'
import { IUser } from '@/types/types'

class UserService {
	private _BASE_URL = '/users'

	async fetchProfile() {
		return instance.get<IUser>(`${this._BASE_URL}/profile`)
	}

	async fetchPremium() {
		return instance.get<{ text: string }>(`${this._BASE_URL}/premium`)
	}

	async fetchManagerContent() {
		return instance.get<{ text: string }>(`${this._BASE_URL}/manager`)
	}

	async fetchList() {
		return instance.get<IUser[]>(`${this._BASE_URL}/list`)
	}

	async update(data: TypeUserForm) {
		const response = await instance.put(this._BASE_URL, data)
		return response.data
	}
}

export const userService = new UserService()
