<script>
	let { time, mins } = $props();
</script>

<div class="dep-time text-center rounded-full border p-1 w-25 min-w-fit">
	<p>
		{#if mins > 15}
			{time}
		{:else if mins <= 1}
			DUE
		{:else}
			{mins} MIN
		{/if}
	</p>
</div>
