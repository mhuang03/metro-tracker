<script>
	let { children } = $props();
</script>

<div class="grid grid-cols-subgrid col-span-full">
	{@render children()}
</div>
