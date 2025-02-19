<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { getData } from '$lib/nextrip';
	import Station from '$lib/components/Station.svelte';
	import Separator from '$lib/components/Separator.svelte';

	let { data } = $props();
	let stationInfos = $state.raw(data.stationInfos);

	const timeNow = () =>
		new Date().toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			timeZone: 'America/Chicago'
		});
	let lastUpdate = $state(timeNow());
	let currentTime = $state(timeNow());

	let interval1: NodeJS.Timeout;
	let interval2: NodeJS.Timeout;
	onMount(() => {
		interval1 = setInterval(() => {
			getData(fetch).then((newData) => {
				stationInfos = newData;
				lastUpdate = timeNow();
			});
		}, 15000);
		interval2 = setInterval(() => {
			currentTime = timeNow();
		}, 1000);
	});
	onDestroy(() => {
		clearInterval(interval1);
		clearInterval(interval2);
	});
</script>

<div class="info-box grid grid-cols-[repeat(3,max-content)] gap-3">
	{#each stationInfos as stationInfo, i}
		<Station {stationInfo} />
		{#if i < stationInfos.length - 1}
			<Separator />
		{/if}
	{/each}
</div>
<div class="text-right">
	<p>
		Now: {currentTime}
	</p>
	<p>
		Last updated: {lastUpdate}
	</p>
</div>
