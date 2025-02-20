<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { getData } from '$lib/nextrip';
	import Station from '$lib/components/Station.svelte';
	import Separator from '$lib/components/Separator.svelte';
	import { page } from '$app/state';

	let stationInfos = $state.raw(page.data.stationInfos);
	$inspect(stationInfos);

	const updateData = () =>
		getData(fetch).then((newData) => {
			stationInfos = newData;
			lastUpdate = new Date();
		});

	const getTimeText = (date: Date) =>
		date.toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			timeZone: 'America/Chicago'
		});

	let lastUpdate = $state(new Date());
	let currentTime = $state(new Date());
	let lastUpdateText = $derived(getTimeText(lastUpdate));
	let currentTimeText = $derived(getTimeText(currentTime));

	let interval: NodeJS.Timeout;
	onMount(() => {
		window.addEventListener('focus', () => {
			updateData();
		});

		interval = setInterval(() => {
			currentTime = new Date();
			if (currentTime.getTime() - lastUpdate.getTime() >= 15000) {
				updateData();
			}
		}, 1000);
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<div class="flex flex-col items-center gap-6">
	<div class="grid grid-cols-[repeat(3,max-content)] gap-3">
		{#each stationInfos as stationInfo, i}
			<Station {stationInfo} />
			{#if i < stationInfos.length - 1}
				<Separator />
			{/if}
		{/each}
	</div>
	<div class="text-right">
		<p>
			Now: {currentTimeText}
		</p>
		<p>
			Last updated: {lastUpdateText}
		</p>
	</div>
</div>
