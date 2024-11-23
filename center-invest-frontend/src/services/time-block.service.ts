import { instance } from '@/api/axios'
import {
	ITimeBlockResponse,
	TypeTimeBlockFormState
} from '@/types/time-block.types'



class TimeBlockService {
	private BASE_URL = '/user/time-blocks'

	async getTimeBlocks() {
		const response = await instance.get<ITimeBlockResponse[]>(
			this.BASE_URL
		)
		return response
	}

	async createTimeBlock(data: TypeTimeBlockFormState) {
		const response = await instance.post(this.BASE_URL, data)
		return response
	}

	async updateOrderTimeBlock(ids: string[]) {
		const response = await instance.put(`${this.BASE_URL}/update-order`, {
			ids
		})
		return response
	}

	async updateTimeBlock(id: string, data: TypeTimeBlockFormState) {
		const response = await instance.put(`${this.BASE_URL}/${id}`, data)
		return response
	}

	async deleteTimeBlock(id: string) {
		const response = await instance.delete(`${this.BASE_URL}/${id}`)
		return response
	}
}

export const timeBlockService = new TimeBlockService()
