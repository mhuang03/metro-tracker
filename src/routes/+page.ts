import type { PageLoad } from './$types';
import { getData, STATIONS, DIRECTIONS } from '$lib/nextrip';

export const load: PageLoad = async ({ fetch }) => {
	let stationInfos = await getData(fetch);
	return {
		stationInfos
	};
};
