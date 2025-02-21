<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { getData } from '$lib/nextrip';
	import { getTimeHMS } from '$lib/utils';
	import Station from '$lib/components/Station.svelte';
	import Separator from '$lib/components/Separator.svelte';
	import { page } from '$app/state';

	let stationInfos = $state.raw(page.data.stationInfos);
	$inspect(stationInfos);

	let lastUpdate = $state(new Date());
	let currentTime = $state(new Date());
	let updateInProgress = $state(false);

	const updateData = () => {
		updateInProgress = true;
		return getData().then((newData) => {
			stationInfos = newData;
			lastUpdate = currentTime;
			updateInProgress = false;
		});
	};

	let lastUpdateText = $derived(getTimeHMS(lastUpdate));
	$inspect(lastUpdateText);
	let currentTimeText = $derived(getTimeHMS(currentTime));

	let interval: any;
	onMount(() => {
		window.addEventListener('focus', () => {
			updateData();
		});

		interval = setInterval(() => {
			currentTime = new Date();
			if (currentTime.getTime() - lastUpdate.getTime() >= 15000 && !updateInProgress) {
				updateData();
			}
		}, 1000);
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<div class="flex flex-col items-center gap-6">
	<div
		class="grid gap-3 grid-cols-[repeat(3,max-content)] sm:grid-cols-auto sm:grid-rows-[repeat(3,max-content)] sm:[direction:rtl]"
	>
		{#each stationInfos as stationInfo, i}
			<Station {stationInfo} index={2 * i} />
			{#if i < stationInfos.length - 1}
				<Separator index={2 * i + 1} />
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
