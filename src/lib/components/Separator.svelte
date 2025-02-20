<script>
	import Row from '$lib/components/Row.svelte';
	import Arrow from '$lib/components/Arrow.svelte';
</script>

<Row>
	<div class="flex items-center justify-center text-6xl">
		<Arrow dir="d" class="w-5 h-25 m-2 sm:hidden" />
		<Arrow dir="l" class="w-25 h-5 m-2 hidden sm:inline" />
	</div>
	<div class="flex items-center justify-center text-6xl -col-start-1 -row-start-1">
		<Arrow dir="u" class="w-5 h-25 m-2 sm:hidden" />
		<Arrow dir="r" class="w-25 h-5 m-2 hidden sm:inline" />
	</div>
</Row>
