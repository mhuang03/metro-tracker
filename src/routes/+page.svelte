<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { getData } from '$lib/nextrip';
	import Station from '$lib/components/Station.svelte';
	import Separator from '$lib/components/Separator.svelte';

	let { data } = $props();
	let stationInfos = $state.raw(data.stationInfos);

	let interval: NodeJS.Timeout;
	onMount(() => {
		interval = setInterval(() => {
			getData(fetch).then((newData) => {
				stationInfos = newData;
			});
		}, 15000);
	});
	onDestroy(() => clearInterval(interval));
</script>

<div class="info-box grid grid-cols-[repeat(3,max-content)] gap-3">
	{#each stationInfos as stationInfo, i}
		<Station {stationInfo} />
		{#if i < stationInfos.length - 1}
			<Separator />
		{/if}
	{/each}
</div>
