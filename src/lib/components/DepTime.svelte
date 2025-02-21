<script lang="ts">
	let { deps } = $props();

	let displayDeps = $derived(deps.slice(0, 3));
</script>

<div class="text-center rounded-2xl border-2 p-1 w-25 min-w-fit">
	{#if deps.length > 0}
		{#each displayDeps as dep}
			<p>{dep.departure_text + (dep.actual ? '' : '*')}</p>
		{/each}
	{:else}
		<p>---</p>
	{/if}
</div>
