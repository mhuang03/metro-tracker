<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { getData } from '$lib/nextrip';
	import Station from '$lib/components/Station.svelte';
	import Separator from '$lib/components/Separator.svelte';
	import { page } from '$app/state';

	let stationInfos = $state.raw(page.data.stationInfos);
	$inspect(stationInfos);

	const timeNow = () =>
		new Date().toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			timeZone: 'America/Chicago'
		});

	let lastUpdate = $state(timeNow());
	let currentTime = $state(timeNow());

	let timeSinceLast = 0;
	let interval: NodeJS.Timeout;
	onMount(() => {
		interval = setInterval(() => {
			currentTime = timeNow();
			if (timeSinceLast >= 15) {
				getData(fetch).then((newData) => {
					stationInfos = newData;
					lastUpdate = timeNow();
				});
				timeSinceLast = 0;
			} else timeSinceLast += 1;
		}, 1000);
	});
	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<div class="flex flex-col items-center gap-6">
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
</div>
