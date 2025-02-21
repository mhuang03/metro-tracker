<script>
	import Row from '$lib/components/Row.svelte';
	import DepTime from '$lib/components/DepTime.svelte';
	import StopLabel from '$lib/components/StopLabel.svelte';

	let { stationInfo, index } = $props();
	let id = $derived(stationInfo.id);
	let name = $derived(stationInfo.name);
	let EB = $derived(stationInfo.EB);
	let WB = $derived(stationInfo.WB);
</script>

<Row {index}>
	<DepTime deps={EB} />
	<StopLabel {id} {name} />
	<DepTime deps={WB} />
</Row>
