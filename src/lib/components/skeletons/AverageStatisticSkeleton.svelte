<script lang="ts">
    import {LayerCake, Svg} from "layercake";
    import AxisX from "$lib/components/chart/AxisX.svelte";
    import AxisY from "$lib/components/chart/AxisY.svelte";
    import Line from "$lib/components/chart/Line.svelte";
    import Area from "$lib/components/chart/Area.svelte";

    export let metric: string

    const points = [
        {index: 0, value: 0},
        {index: 1, value: 0},
        {index: 2, value: 0},
        {index: 3, value: 0},
        {index: 4, value: 0},
        {index: 5, value: 0},
        {index: 6, value: 0},
        {index: 7, value: 0},
        {index: 8, value: 0},
        {index: 9, value: 0},
        {index: 10, value: 0},
    ]
</script>
<div class="flex flex-col justify-between animate-pulse p-4 py-8 w-full gap-2 border border-[#797979] border-opacity-30  hover:brightness-125 rounded hover:opacity-80 animated">
    <div class="flex flex-col justify-between gap-2 w-full">
        <p class="font-bold text-4xl uppercase inter">0 {metric}</p>
        <p class="font-light text-gray-300 uppercase text-sm break-words inter">
            Loading
        </p>
        <div class="w-full h-32 mt-4">
            <LayerCake data={points} x="index" y="value">
                <Svg>
                    <AxisX/>
                    <AxisY
                            ticks={2}
                    />
                    <Line/>
                    <Area/>
                </Svg>
            </LayerCake>
        </div>
    </div>
</div>