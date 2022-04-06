<script>
import bookingImage01 from '@/assets/images/bookingImage01.jpg';
import bookingImage02 from '@/assets/images/bookingImage02.jpg';

export default {
  setup() {
    return {
      bookingImage01,
      bookingImage02,
    };
  },
};
</script>

<template>
  <section class="min-h-screen" :style="{backgroundImage: `url(${bookImage01})`}">

  </section>
</template>
