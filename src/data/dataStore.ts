import { Birthday } from "./birthday";
import { createCache } from "./createCache";
import { fetchOnThisDay, OnThisDayBirthsResponse } from "./fetchOnThisDay";
import { toBirthdays } from "./toBirthdays";

export type DataStore = {
	fetchBirthdays(date: Date): Promise<Birthday[]>;
}

export function createDataStore(): DataStore {
	const birthsCache = createCache<OnThisDayBirthsResponse>();

	const fetchBirthdays = (date: Date): Promise<Birthday[]> => {
		const cachedResponse = birthsCache.get(date);
		if (cachedResponse) {
			return toBirthdays(cachedResponse);
		}

		const response = fetchOnThisDay({ type: "births", language: "en", date });

		birthsCache.add(date, response);
		return toBirthdays(response);
	}

	return {
		fetchBirthdays
	}
}