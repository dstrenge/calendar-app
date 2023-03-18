import { OnThisDayResponse } from "./fetchOnThisDay";

type OnThisDayResponseCache<T extends OnThisDayResponse> = {
	get(date: Date): Promise<T> | undefined;
	add(date: Date, response: Promise<T>): void;
};

function getKey(date: Date): string {
	return `${date.getMonth()}/${date.getDate()}`;
}

export function createCache<T extends OnThisDayResponse>(): OnThisDayResponseCache<T> {

	const cachedItems: Record<string, Promise<T>> = {};

	const get = (date: Date): Promise<T> | undefined => {
		const key = getKey(date);
		return cachedItems[key];
	}

	const add = (date: Date, response: Promise<T>): void => {
		const key = getKey(date);
		cachedItems[key] = response;
	}

	return {
		get,
		add
	}
}