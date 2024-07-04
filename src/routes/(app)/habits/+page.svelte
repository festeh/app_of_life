<script lang="ts">
	import Habits from "../../../components/habits/habits.svelte";

  export let data;

</script>

<Habits habits={data.habits} />
