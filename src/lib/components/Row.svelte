<script>
	let { children } = $props();
</script>

<div
	class="grid gap-3 grid-cols-subgrid col-span-full md:col-auto md:grid-rows-subgrid md:row-span-full"
>
	{@render children()}
</div>
