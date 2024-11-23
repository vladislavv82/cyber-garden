import * as React from 'react';

export default function NotificationEmail({ name }: { name: string }) {
	return (
		<div>
			<h1>Напоминание о задаче!</h1>

			<p>
				У вас запланирована задача: <strong>{name}</strong>.
			</p>

			<p>Не забудьте подготовиться!</p>

			<p style={{ color: '#A981DC' }}>Желаем вам продуктивности!</p>
		</div>
	);
}
