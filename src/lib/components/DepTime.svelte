<script lang="ts">
	let { deps } = $props();
</script>

<div class="text-center rounded-2xl border-2 p-1 w-25 min-w-fit">
	{#each Array(3) as _, i}
		{#if deps[i]}
			<p>{(deps[i].actual ? '' : '*') + deps[i].departure_text}</p>
		{:else}
			<p>---</p>
		{/if}
	{/each}
</div>
