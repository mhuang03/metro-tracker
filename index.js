const ROUTE_ID = 902;

const DIRECTIONS = {
  0: "EB",
  1: "WB",
};

const STATIONS = {
  STVI: "Stadium Village",
  EABK: "East Bank",
  WEBK: "West Bank",
};

const nextDeparture = (departures) => {
  return departures.reduce((acc, dep) => {
    dep.departure_time = new Date(dep.departure_time * 1000);
    if (acc == null || dep.departure_time < acc.departure_time) return dep;
    return acc;
  }, null);
};

const getData = async () => {
  let deps = {};
  for (const station in STATIONS) {
    deps[station] = {};
    for (const direction in DIRECTIONS) {
      const url = `https://svc.metrotransit.org/nextrip/${ROUTE_ID}/${direction}/${station}`;
      const response = await fetch(url);
      const data = await response.json();
      const nextDep = nextDeparture(data.departures);
      const dirName = DIRECTIONS[direction];

      if (!nextDep) {
        deps[station][dirName] = "N/A";
        continue;
      }

      const nextText = nextDep.departure_text.toUpperCase();
      const nextTime = nextDep.departure_time.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/Chicago",
      });
      deps[station][dirName] = nextTime.includes(nextText) ? nextTime : nextText;
    }
  }
  return deps;
};

const updateDisplay = (deps) => {
  for (const station in deps) {
    for (const direction in deps[station]) {
      const e = document.querySelector(`.${station}-${direction} > p`);
      e.textContent = deps[station][direction];
    }
  }
};

// update every 15 seconds
setInterval(() => {
  getData().then(updateDisplay);
}, 15000);
getData().then(updateDisplay);
