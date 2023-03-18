import { Birthday } from "./birthday";
import { OnThisDayBirthsResponse } from "./fetchOnThisDay";

export async function toBirthdays(response: Promise<OnThisDayBirthsResponse>): Promise<Birthday[]> {
	const { births } = await response;
	if (!births) {
		throw new Error("Unexpected response: No births were returned for this date.");
	}

	return births.map(birth => {
		const { text } = birth;
		return { text }
	});
}
