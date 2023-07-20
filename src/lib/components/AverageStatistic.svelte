<script lang="ts">
    import {LayerCake, Svg} from "layercake";
    import AxisX from "$lib/components/chart/AxisX.svelte";
    import AxisY from "$lib/components/chart/AxisY.svelte";
    import Line from "$lib/components/chart/Line.svelte";
    import Area from "$lib/components/chart/Area.svelte";

    export let statistic: Average
    export let metric: string

    if (statistic.values.length < 10) {
        for (let i = 0; i < 10 - statistic.values.length; i++) {
            statistic.values.push(0)
        }
    }

    const points = statistic.values.map((value, index) => {
        return {index, value}
    })
</script>
<div class="flex flex-col justify-between p-4 py-8 w-full gap-2 border border-[#797979] border-opacity-30  hover:brightness-125 rounded hover:opacity-80 animated">
    <div class="flex flex-col justify-between gap-2 w-full">
        <p class="font-bold text-4xl uppercase inter">{statistic.avg} {metric}</p>
        <p class="font-light text-gray-300 uppercase text-sm break-words inter">
            <slot/>
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