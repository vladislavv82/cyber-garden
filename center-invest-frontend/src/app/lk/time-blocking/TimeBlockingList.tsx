import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import Loader from '@/components/ui/Loader'

import { TimeBlock } from './TimeBlock'
import styles from './TimeBlocking.module.scss'
import { calcHoursLeft } from './calc-hours-left'
import { useTimeBlockDnd } from './hooks/useTimeBlockDnd'
import { useTimeBlocks } from './hooks/useTimeBlocks'

export function TimeBlockingList() {
	const { items, setItems, isLoading } = useTimeBlocks()
	const { handleDragEnd, sensors } = useTimeBlockDnd(items, setItems)

	if (isLoading) return <Loader />

	const { hoursLeft } = calcHoursLeft(items)

	return (
		<div>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
			>
				<div className={styles.list}>
					<SortableContext
						items={items || []}
						strategy={verticalListSortingStrategy}
					>
						{items?.length ? (
							items?.map(item => (
								<TimeBlock
									key={item.id}
									item={item}
								/>
							))
						) : (
							<div>Добавьте первый тайм-блок в форме</div>
						)}
					</SortableContext>
				</div>
			</DndContext>
			<div>
				{hoursLeft > 8
					? `Свободного времени осталось - ${hoursLeft}ч. `
					: 'Снизьте нагрузку! Осталось мало времени на сон.'}
			</div>
		</div>
	)
}
