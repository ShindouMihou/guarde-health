<script>
  import "../app.postcss";
</script>

<div class="min-h-screen flex flex-col w-full p-4 py-8 md:px-12 text-white">
    <div class="w-full">
        <div class="flex flex-col select-none">
            <h1 class="font-bold text-4xl uppercase bebas leading-none">Guarde</h1>
            <p class="indie leading-none text-xs lowercase">By Qucy Studio</p>
        </div>
        <div class="py-4 w-full">
            <slot />
        </div>
    </div>
</div>
