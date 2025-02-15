<script>
import { useField } from 'vee-validate';

export default {
  props: {
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: null,
    },
    pattern: {
      type: String,
    },
    maxlength: {
      type: String,
    },
    minlength: {
      type: String,
    },
    successMessage: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    // we don't provide any rules here because we are using form-level validation
    // https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
    const {
      value: inputValue,
      errorMessage,
      handleBlur,
      handleChange,
      meta,
    } = useField(props.name, undefined, {
      initialValue: props.value,
    });

    return {
      handleChange,
      handleBlur,
      errorMessage,
      inputValue,
      meta,
    };
  },
};
</script>

<template>
  <div class="w-full form-control">
    <label class="label" :for="name">
      <span class="label-text">{{ label }}</span>
      </label>
    <input
      class="input form-style"
      :class="{ 'bg-danger-100 ring-danger-500': errorMessage }"
      :name="name"
      :id="name"
      :type="type"
      :size="size"
      :pattern="pattern"
      :maxlength="Number.parseInt(maxlength)"
      :minlength="Number.parseInt(minlength)"
      :value="inputValue"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="handleChange"
      @blur="handleBlur"
    />
    <p class="text-danger-500" v-show="errorMessage || meta.valid">
      {{ errorMessage || successMessage }}
    </p>
  </div>
</template>
