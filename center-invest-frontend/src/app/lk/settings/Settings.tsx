'use client'

import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Field'

import { TypeUserForm } from '@/types/auth.types'

import { useInitialData } from './useInitialData'
import { useUpdateSettings } from './useUpdateSettings'

export function Settings() {
	const { register, handleSubmit, reset } = useForm<TypeUserForm>({
		mode: 'onChange'
	})

	useInitialData(reset)

	const { isPending, mutate } = useUpdateSettings()

	const onSubmit: SubmitHandler<TypeUserForm> = data => {
		const { password, ...rest } = data

		mutate({
			...rest,
			password: password || undefined
		})
	}

	return (
		<div>
			<form
				className='w-2/4'
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className='grid grid-cols-2 gap-10'>
					<div>
						<Field
							id='email'
							label=''
							placeholder='Почта'
							type='email'
							{...register('email', {
								required: 'Email is required!'
							})}
							extra='mb-4'
						/>

						<Field
							id='name'
							label=''
							placeholder='Имя'
							{...register('name')}
							extra='mb-4'
						/>

						<Field
							id='password'
							label=''
							placeholder='Сменить пароль'
							type='password'
							{...register('password')}
							extra='mb-10'
						/>
					</div>

					<div>
						<Field
							id='workInterval'
							label='Длительность круга помодоро(мин.)'
							placeholder=''
							isNumber
							{...register('workInterval', {
								valueAsNumber: true
							})}
							extra='mb-4'
						/>

						<Field
							id='breakInterval'
							label='Длительность отдыха помодоро(мин.)'
							placeholder=''
							isNumber
							{...register('breakInterval', {
								valueAsNumber: true
							})}
							extra='mb-4'
						/>

						<Field
							id='intervalsCount'
							label='Количество кругов помодоро'
							placeholder=''
							isNumber
							{...register('intervalsCount', {
								valueAsNumber: true
							})}
							extra='mb-6'
						/>
					</div>
				</div>

				<Button
					type='submit'
					disabled={isPending}
				>
					Save
				</Button>
			</form>
		</div>
	)
}
