<script>
	let { index, children } = $props();
</script>

<div
	class="grid gap-3 grid-cols-subgrid col-span-full sm:col-auto sm:grid-rows-subgrid sm:row-span-full order-{index} sm:-order-{index}"
>
	{@render children()}
</div>
