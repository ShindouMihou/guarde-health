<script lang="ts">
    import {onMount, onDestroy} from "svelte";
    import {fetchHealthCheck} from "$lib/requests/fetchHealthCheck.js";
    import NumericStatistic from "$lib/components/NumericStatistic.svelte";
    import AverageStatistic from "$lib/components/AverageStatistic.svelte";
    import NumericStatisticSkeleton from "$lib/components/skeletons/NumericStatisticSkeleton.svelte";
    import AverageStatisticSkeleton from "$lib/components/skeletons/AverageStatisticSkeleton.svelte";

    let healthCheck: HealthCheck
    let lastFetched: Date

    let refreshingLoad: number
    let loading = false

    onMount(async () => {
        await load()
        refreshingLoad = setInterval(load, 15_000)
    })

    onDestroy(() => {
        clearInterval(refreshingLoad)
        refreshingLoad = 0
    })

    async function load() {
        if (loading) {
            return
        }

        loading = true

        healthCheck = await fetchHealthCheck()
        lastFetched = new Date()

        setTimeout(() => { loading = false; }, 1050)
    }
</script>
<div class="flex flex-col w-full py-12 w-full">
    <div class="pb-4 flex flex-col">
        <h2 class="text-2xl font-bold uppercase inter">Reverse Proxy Metrics</h2>
        <p class="text-gray-300 text-sm uppercase inter">
            Last fetched:
            <span class="font-bold text-white {loading ? 'animate-pulse' : ''}">
                {lastFetched == null ? 'Never' : lastFetched.toLocaleTimeString()}
            </span>
        </p>
    </div>
    <div class="flex flex-row flex-wrap gap-4 {loading ? 'animate-pulse' : ''}">
        {#if healthCheck != null}
            <div class="flex flex-col lg:flex-row justify-between gap-2 w-full">
                <NumericStatistic statistic={healthCheck.fallback_fails}>Fallback Failures</NumericStatistic>
                <NumericStatistic statistic={healthCheck.requests_errored}>Requests Errored</NumericStatistic>
                <NumericStatistic statistic={healthCheck.requests_forwarded}>Requests Forwarded</NumericStatistic>
                <NumericStatistic statistic={healthCheck.requests_received}>Requests Received</NumericStatistic>
                <NumericStatistic statistic={healthCheck.requests_rejected}>Requests Rejected</NumericStatistic>
                <NumericStatistic statistic={healthCheck.whois_requests}>WHOIS Requests</NumericStatistic>
            </div>
            <div class="flex flex-col lg:flex-row justify-between gap-2 w-full">
                <AverageStatistic statistic={healthCheck.request_latency} metric="ms">Request Latency</AverageStatistic>
                <AverageStatistic statistic={healthCheck.request_size} metric="bytes">Request Sizes</AverageStatistic>
                <AverageStatistic statistic={healthCheck.response_size} metric="bytes">Response Sizes</AverageStatistic>
            </div>
            <div class="flex flex-col lg:flex-row justify-between gap-2 w-full">
                <AverageStatistic statistic={healthCheck.forward_latency} metric="ms">Forward Latency</AverageStatistic>
                <AverageStatistic statistic={healthCheck.fallback_latency} metric="ms">Fallback Latency</AverageStatistic>
            </div>
        {:else}
            <div class="flex flex-col lg:flex-row justify-between gap-2 w-full">
                <NumericStatisticSkeleton/>
                <NumericStatisticSkeleton/>
                <NumericStatisticSkeleton/>
                <NumericStatisticSkeleton/>
                <NumericStatisticSkeleton/>
                <NumericStatisticSkeleton/>
            </div>
            <div class="flex flex-col lg:flex-row justify-between gap-2 w-full">
                <AverageStatisticSkeleton metric="ms"/>
                <AverageStatisticSkeleton metric="bytes"/>
                <AverageStatisticSkeleton metric="bytes"/>
            </div>
            <div class="flex flex-col lg:flex-row justify-between gap-2 w-full">
                <AverageStatisticSkeleton metric="ms"/>
                <AverageStatisticSkeleton metric="ms"/>
            </div>
        {/if}
    </div>
</div>