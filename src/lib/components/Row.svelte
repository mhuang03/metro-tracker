<script>
	let { children } = $props();
</script>

<div
	class="grid gap-3 grid-cols-subgrid col-span-full sm:col-auto sm:grid-rows-subgrid sm:row-span-full"
>
	{@render children()}
</div>
