type OnThisDayImage = {
	source: string;
	width: number;
	height: number;
};

type OnThisDayContentUrl = {
	page: string;
	revision: string;
	edit: string;
	talk: string;
}

type OnThisDayPage = {
	type: "standard" | "disambiguation" | "no-extract" | "main-page";
	namespace: {
		id: string;
		text: string;
	};
	wikibase_item: string;
	titles: {
		canonical: string;
		normalized: string;
		display: string;
	};
	pageid: number;
	thumbnail: OnThisDayImage;
	originalimage: OnThisDayImage;
	lang: string;
	dir: string;
	revision: string;
	tid: string;
	timestamp: string;
	description: string;
	description_source: string;
	content_urls: {
		desktop: OnThisDayContentUrl;
		mobile: OnThisDayContentUrl;
	};
	extract: string;
	extract_html: string;
};

type OnThisDayItem = {
	text: string;
	year: number;
	pages: OnThisDayPage[];
}

type OnThisDaySelectedResponse = {
	selected?: OnThisDayItem[];
}

export type OnThisDayBirthsResponse = {
	births?: OnThisDayItem[];
}

type OnThisDayDeathsResponse = {
	deaths?: OnThisDayItem[];
}

type OnThisDayEventsResponse = {
	events?: OnThisDayItem[];
}

type OnThisDayHolidaysResponse = {
	holidays?: Omit<OnThisDayItem, "year">[];
}

export type OnThisDayResponse = OnThisDaySelectedResponse | OnThisDayBirthsResponse | OnThisDayDeathsResponse | OnThisDayEventsResponse | OnThisDayHolidaysResponse;

type FetchOnThisDayParams<T extends string> = {
	language: string;
	type: T;
	date: Date;
}

export async function fetchOnThisDay(params: FetchOnThisDayParams<"selected">): Promise<OnThisDaySelectedResponse>;
export async function fetchOnThisDay(params: FetchOnThisDayParams<"births">): Promise<OnThisDayBirthsResponse>;
export async function fetchOnThisDay(params: FetchOnThisDayParams<"deaths">): Promise<OnThisDayDeathsResponse>;
export async function fetchOnThisDay(params: FetchOnThisDayParams<"events">): Promise<OnThisDayEventsResponse>;
export async function fetchOnThisDay(params: FetchOnThisDayParams<"holidays">): Promise<OnThisDayHolidaysResponse>;
export async function fetchOnThisDay(params: FetchOnThisDayParams<string>): Promise<OnThisDayResponse> {
	const { date, type, language } = params;

	const month = date.getMonth();
	const day = date.getDate();
	const url = `https://api.wikimedia.org/feed/v1/wikipedia/${language}/onthisday/${type}/${month}/${day}`;

	const response = await fetch(url);
	return response.json();
}