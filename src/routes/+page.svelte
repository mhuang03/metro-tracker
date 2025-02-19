<script lang="ts">
	import Tracker from '$lib/components/Tracker.svelte';

	let { data } = $props();
</script>

<Tracker {data} />
