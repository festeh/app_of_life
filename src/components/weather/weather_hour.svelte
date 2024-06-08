<script lang="ts">
	export let info;
</script>

		<div class="bg-surface-100 p-6 rounded-lg shadow-md flex">
			<div class="flex justify-center items-center">
				<div class="text-center">
					<p class="text-xl font-bold mb-2">{info.time}</p>
				</div>
			</div>
			<div class="ml-8 flex justify-center items-center">
				<div class="text-center">
					<p class="text-xl font-bold mb-2">{info.temperature}</p>
					<p class="text-lg">Темпа</p>
				</div>
				<div class="text-center ml-4">
					<p class="text-xl font-bold mb-2">{info.humidity}</p>
					<p class="text-lg">Влажность</p>
				</div>
        <div class="text-center ml-4">
          <p class="text-xl font-bold mb-2">{info.precipitation}</p>
          <p class="text-lg">P(дождик)</p>
        </div>
        <div class="text-center ml-4">
          <p class="text-xl font-bold mb-2">{info.uvIndex}</p>
          <p class="text-lg">УФ-индекс</p>
        </div>
        <div class="text-center ml-4">
          <p class="text-xl font-bold mb-2">{info.uvHealthConcern}</p>
          <p class="text-lg">УФ-опасность</p>
        </div>
        <div class="text-center ml-4">
          <p class="text-xl font-bold mb-2">{info.windSpeed}</p>
          <p class="text-lg">Ветер</p>
        </div>
			</div>
			<!-- <div class="ml-4 text-center"> -->
			<!-- 	<p class="text-lg">{info.description}</p> -->
			<!-- </div> -->
		</div>
