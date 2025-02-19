<script>
	import { getData, STATIONS, DIRECTIONS } from '$lib/nextrip';
	import DepTime from '$lib/components/DepTime.svelte';
	import StopLabel from '$lib/components/StopLabel.svelte';

	let { stationInfo } = $props();
	let id = stationInfo.id;
	let name = stationInfo.name;
	let EB = stationInfo.EB;
	let WB = stationInfo.WB;
</script>

<div class="grid grid-cols-subgrid col-span-full">
	<DepTime time={WB.time} mins={WB.mins} />
	<StopLabel {id} {name} />
	<DepTime time={EB.time} mins={EB.mins} />
</div>
