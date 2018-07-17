export const getFreeEntryDaysLeft = date =>
	30 - Math.floor((Date.now() - date) / (1000 * 3600 * 24));
