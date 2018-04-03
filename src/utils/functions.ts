export const calculateAge = (start: string) => {
	const timestampUTC = +new Date(start)
	const nowUTC = new Date().toUTCString()
	const diffMs = +new Date(nowUTC) - timestampUTC
	var diffDays = Math.floor(diffMs / 86400000) // days
	var diffHrs = Math.floor((diffMs % 86400000) / 3600000) // hours
	var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000) // minutes
	var diffSecs = Math.round(diffMs / 1000) // seconds
	return !!diffDays ? diffDays + 'd' : !!diffHrs ? diffHrs + 'h' : !!diffMins ? diffMins + 'm' : diffSecs + 's'
}

export const toKB = (bytes: number | string) => {
	let bytesInt: number
	typeof bytes === 'string' ? (bytesInt = parseInt(bytes)) : (bytesInt = bytes)
	return bytesInt / 1000 + ' kB'
}
