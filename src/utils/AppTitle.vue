<script>
import { defineComponent, h } from 'vue';

export default defineComponent({
  name: 'AppTitle',
  props: {
    title: String,
    level: String,
  },
  render() {
    const tag = `h${this.level}`;
    return h(
      tag,
      {
        class: `rfs:text-5xl font-medium
        pb-4 border-b md:w-1/2 mx-auto text-center`,
      },
      this.$slots.default(),
    );
  },
});
</script>
