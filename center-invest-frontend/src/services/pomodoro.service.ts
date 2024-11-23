import {
	IPomodoroSessionResponse,
	TypePomodoroRoundFormState,
	TypePomodoroSessionFormState
} from '@/types/pomodoro.types'

import { instance } from '@/api/axios'

class PomodoroService {
	private BASE_URL = '/user/timer'

	async getTodaySession() {
		const response = await instance.get<IPomodoroSessionResponse>(
			`${this.BASE_URL}/today`
		)
		return response
	}

	async createSession() {
		const response = await instance.post<IPomodoroSessionResponse>(
			this.BASE_URL
		)
		return response
	}

	async updateSession(id: string, data: TypePomodoroSessionFormState) {
		const response = await instance.put(`${this.BASE_URL}/${id}`, data)
		return response
	}

	async deleteSession(id: string) {
		const response = await instance.delete(`${this.BASE_URL}/${id}`)
		return response
	}

	async updateRound(id: string, data: TypePomodoroRoundFormState) {
		const response = await instance.put(
			`${this.BASE_URL}/round/${id}`,
			data
		)
		return response
	}
}

export const pomodoroService = new PomodoroService()
