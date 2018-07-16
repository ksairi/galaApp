export const getFreeEntryDaysLeft = date =>
	30 - Math.ceil((Date.now() - date) / (1000 * 3600 * 24));
