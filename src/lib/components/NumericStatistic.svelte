<script lang="ts">
    export let statistic: number;
</script>
<div class="flex flex-col justify-between p-4 py-8 w-full gap-2 border border-[#797979] border-opacity-30  hover:brightness-125 rounded hover:opacity-80 animated">
    <div class="flex flex-col justify-between gap-2">
        <p class="font-bold text-4xl uppercase inter">{statistic.toLocaleString('en-US')}</p>
        <p class="font-light text-gray-300 uppercase text-sm break-words inter">
            <slot/>
        </p>
    </div>
</div>