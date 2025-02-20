<script lang="ts">
	let { dir, ...rest } = $props();

	const transforms: any = {
		r: 'rotate(0)',
		u: 'rotate(90)',
		l: 'rotate(180)',
		d: 'rotate(270)'
	};
	const dims: any = {
		width: {
			h: '200mm',
			v: '40mm'
		},
		height: {
			h: '40mm',
			v: '200mm'
		},
		viewBox: {
			h: '-100 -20 200 40',
			v: '-20 -100 40 200'
		}
	};
	let hv = dir == 'r' || dir == 'l' ? 'h' : 'v';
	let transform = $derived(transforms[dir]);
	let width = $derived(dims.width[hv]);
	let height = $derived(dims.height[hv]);
	let viewBox = $derived(dims.viewBox[hv]);
</script>

<svg {...rest} {width} {height} {viewBox} version="1.1" xmlns="http://www.w3.org/2000/svg">
	<g
		{transform}
		fill="none"
		stroke="#000"
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="4"
	>
		<path stroke-dasharray="5,10" d="M-98 0H96" />
		<path d="M80 -18L98 0L80 18" />
	</g>
</svg>
