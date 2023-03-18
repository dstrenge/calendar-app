import { Birthday } from "@ds/data/birthday";
import { createDataStore } from "@ds/data/dataStore";
import React from "react";

export const Calendar = (): JSX.Element => {
	const [birthdays, setBirthdays] = React.useState<Birthday[]>([]);
	const dataStore = React.useMemo(() => {
		return createDataStore();
	}, [])

	React.useEffect(() => {
		const init = async () => {
			const birthdays = await dataStore.fetchBirthdays(new Date());
			setBirthdays(birthdays);
		};
		init();
	}, [dataStore]);

	return <>{birthdays.length}</>;
}