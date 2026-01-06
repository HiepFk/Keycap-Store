import { useDateFormat } from '@vueuse/core'

export function randomRange(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

export function capitalize(str: string): string {
	if (str.length === 1) {
		return str.toUpperCase()
	}

	return str.charAt(0).toUpperCase() + str.slice(1)
}

export const formatDate = (date: string | Date) => {
	return useDateFormat(date, 'HH:mm - DD/MM/YYYY').value
}
