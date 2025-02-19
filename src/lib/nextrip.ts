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

type Departure = {
	departure_time: number;
	departure_text: string;
	departure_date: Date;
};

const nextDeparture = (departures: Departure[]) => {
	if (departures.length === 0) return null;

	departures.forEach((dep: Departure) => {
		dep.departure_date = new Date(dep.departure_time * 1000);
	});

	return departures.reduce((acc: Departure, dep: Departure) => {
		if (dep.departure_time < acc.departure_time) return dep;
		return acc;
	});
};

export const getData = async (fetch: CallableFunction) => {
	let deps = [];
	for (const station in STATIONS) {
		let thisStation: any = { id: station, name: STATIONS[station] };
		for (const direction in DIRECTIONS) {
			const dirName = DIRECTIONS[direction];
			const url = `https://svc.metrotransit.org/nextrip/${ROUTE_ID}/${direction}/${station}`;
			const response = await fetch(url);
			const data = await response.json();
			const nextDep = nextDeparture(data.departures);
			const now = new Date();

			if (!nextDep) {
				thisStation[dirName] = {
					text: 'N/A'
				};
				continue;
			}

			// const nextText = nextDep.departure_text.toUpperCase();
			const nextTime = nextDep.departure_date.toLocaleTimeString('en-US', {
				hour: '2-digit',
				minute: '2-digit',
				timeZone: 'America/Chicago'
			});
			thisStation[dirName] = {
				text: nextDep.departure_text.toUpperCase()
			};
		}
		deps.push(thisStation);
	}
	return deps;
};
