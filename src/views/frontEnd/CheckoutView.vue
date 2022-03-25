<script>
import OrderForm from '@/components/OrderForm.vue';

export default {
  components: { OrderForm },
  setup(props) {
    console.log(props);
    return {
    };
  },
};
</script>
<template>
  <OrderForm />
</template>
