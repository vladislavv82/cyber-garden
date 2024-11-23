import { type Dispatch, type SetStateAction } from 'react'

import type { ITaskResponse } from '@/types/task.types'

interface IKanbanAddCardInput {
	filterDate?: string
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export function KanbanAddCardInput({
	setItems,
	filterDate
}: IKanbanAddCardInput) {
	const addCard = () => {
		setItems(prev => {
			if (!prev) return

			return [
				...prev,
				{
					id: '',
					name: '',
					isCompleted: false,
					createdAt: filterDate
				}
			]
		})
	}

	return (
		<div className='mt-5'>
			<button
				onClick={addCard}
				className='w-10 h-10 hover:bg-zinc-500 leading-normal bg-zinc-600 text-xl rounded opacity-40'
			>
				+
			</button>
		</div>
	)
}
