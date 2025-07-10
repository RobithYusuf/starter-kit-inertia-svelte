<script>
    export let padding = 'p-4';
    export let margin = '';
    export let shadow = 'shadow-sm';
    export let rounded = 'rounded-lg';
    export let border = '';
    export let background = 'bg-white';
    export let className = '';
</script>

<div class="{background} {rounded} {shadow} {padding} {margin} {border} {className}">
    <slot />
</div>