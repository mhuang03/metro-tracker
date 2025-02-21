import { getTimeHM } from '$lib/utils';

const ROUTE_ID = 902;

interface Map {
	[key: string]: string;
}

export const DIRECTIONS: Map = {
	0: 'EB',
	1: 'WB'
};

export const STATIONS: Map = {
	STVI: 'Stadium Village',
	EABK: 'East Bank',
	WEBK: 'West Bank'
};

export type Departure = {
	actual: boolean;
	departure_time: number;
	departure_text: string;
	departure_date: Date;
};

const sortDepartures = (departures: Departure[]) => {
	departures.forEach((dep: Departure) => {
		dep.departure_date = new Date(dep.departure_time * 1000);
		dep.departure_text = dep.departure_text.toUpperCase();
		dep.departure_text = dep.departure_text.includes(':')
			? getTimeHM(dep.departure_date)
			: dep.departure_text;
	});

	return departures.sort((a: Departure, b: Departure) => a.departure_time - b.departure_time);
};

export const getData = async (f = fetch) => {
	let deps = [];
	for (const station in STATIONS) {
		let thisStation: any = { id: station, name: STATIONS[station] };
		for (const direction in DIRECTIONS) {
			const dirName = DIRECTIONS[direction];
			const url = `https://svc.metrotransit.org/nextrip/${ROUTE_ID}/${direction}/${station}`;
			const response = await f(url);
			const data = await response.json();
			const deps = sortDepartures(data.departures);
			thisStation[dirName] = deps;
		}
		deps.push(thisStation);
	}
	return deps;
};
