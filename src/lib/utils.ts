export const getTimeHMS = (date: Date) =>
	date.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: '2-digit',
		second: '2-digit',
		timeZone: 'America/Chicago'
	});

export const getTimeHM = (date: Date) =>
	date.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: '2-digit',
		timeZone: 'America/Chicago'
	});
