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

export const CPU_COLORS_30 = [
	// 🟢 Green (low → mid)
	'#1B5E20',
	'#2E7D32',
	'#388E3C',
	'#43A047',
	'#4CAF50',
	'#558B2F',
	'#689F38',
	'#7CB342',

	// 🟦 Teal
	'#004D40',
	'#00695C',
	'#00796B',
	'#00897B',
	'#009688',
	'#26A69A',
	'#2BBBAD',

	// 🔵 Blue
	'#0D47A1',
	'#1565C0',
	'#1976D2',
	'#1E88E5',
	'#2196F3',
	'#42A5F5',

	// 🟣 Indigo
	'#283593',
	'#303F9F',
	'#3949AB',
	'#3F51B5',
	'#5C6BC0',
	'#7986CB',
]
