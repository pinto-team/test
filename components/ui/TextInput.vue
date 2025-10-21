<script setup lang="ts">
import {computed, ref, type ComputedRef, type Ref, type ModelRef} from 'vue';

type TextInputProps = {
  inputStyle: 'default' | 'modern'
  type: 'text' | 'email' | 'password' | 'search'
  bgc: 'transparent' | 'secondary'
  placeholder: string
  disabled: boolean
  hasError: boolean
  errorText: string
  isActive: boolean
  delay: boolean
  thin: boolean
  borderHide?: boolean
}
const textInputRef: Ref<HTMLInputElement | null> = ref(null)
const props: Readonly<TextInputProps> = defineProps<TextInputProps>()
const modelValue: ModelRef<string> = defineModel<string>({required: false, default: ''})
const timeOut: Ref<number> = ref(0)
const emit = defineEmits(['keyup', 'update:modelValue', 'submit'])
const isFocused: Ref<boolean> = ref(false)
const useFloatText: ComputedRef<boolean> = computed(() => {
  return props.inputStyle === 'modern'
})
const textInputClass: ComputedRef<string> = computed(() => {
  const classNames: string[] = ['ui-text-input']
  classNames.push(props.bgc)
  classNames.push('modern')
  if (props.disabled) classNames.push('disabled')
  if (props.hasError) classNames.push('error')
  if (props.isActive) classNames.push('active')
  if (props.thin) classNames.push('thin')
  if (props.borderHide) classNames.push('border-hide')
  if (modelValue.value.length > 0 || isFocused.value) classNames.push('focused')
  return classNames.join(' ')
})

function emitKeyup(value: string): void {
  if (props.delay) {
    if (timeOut.value) window.clearTimeout(timeOut.value)
    timeOut.value = window.setTimeout(() => {
      emit('keyup', value)
    }, 650);
  } else {
    emit('keyup', value)
  }
}
</script>
<template>
  <div :class="textInputClass">
    <div class="input-wrapper" @click="textInputRef?.focus()">
      <input
          ref="textInputRef"
          :value="modelValue"
          :type="props.type"
          :disabled="props.disabled"
          :placeholder="props.inputStyle === 'default' ? props.placeholder : undefined"
          @keyup="emitKeyup(($event.target as HTMLInputElement).value)"
          @keyup.enter="emit('submit')"
          @focus="isFocused = true"
          @blur="isFocused = false"
          @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"/>
      <LazyUiText :class="'place-holder'" :color="'secondary64'" :wrap="'nowrap'"
            :textStyle="'14M'" :text-align="'center'"
            :tag="'span'">
        <template #text>
          {{ props.placeholder }}
        </template>
      </LazyUiText>
      <div v-if="useFloatText" class="icon">
        <slot name="icon"></slot>
      </div>
    </div>
<!--    <Text v-if="props.hasError" class="error-text" :color="'red-dark'" :textStyle="'12R'" :tag="'p'"-->
<!--          :text-align="'right'" :wrap="'nowrap'">-->
<!--      <template #text>-->
<!--        {{ props.errorText }}-->
<!--      </template>-->
<!--    </Text>-->
  </div>
</template>
<style scoped lang="scss">
.ui-text-input {
  width: 100%;
  height: 54px;
  position: relative;

  .input-wrapper {
    width: 100%;
    height: 54px;
    border: 2px solid var(--light-secondary-64);
    border-radius: .5rem;
    cursor: text;
    transition: border .15s ease-in-out;
  }

  input {
    width: 100%;
    height: 100%;
    max-height: 54px;
    color: var(--light-secondary-64);
    padding: 1rem;
    border-radius: .5rem;
    @include typo14R;
  }

  &:hover {
    .input-wrapper {
      border-color: var(--cyan);
    }
  }

  .icon {
    text-align: left;
    padding: 1rem .5rem;
  }

  .place-holder {
    position: absolute;
    height: fit-content;
    width: fit-content;
    color: var(--light-secondary-64);
    padding: 0 0.25rem;
    transition: transform 0.35s ease;
    transform: translate(-.25rem, 0);
  }

  &.transparent {
    input {
      background-color: transparent;
    }
  }

  &.border-hide {
    .input-wrapper {
      border: none;
    }
  }

  &.modern {
    height: 56px;

    .input-wrapper {
      height: 56px;
      border: 2px solid var(--light-secondary-64);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    input {
      max-height: 56px;
    }

    &:hover {
      .input-wrapper {
        border-color: var(--cyan);
      }
    }

  }

  &.focused {
    .place-holder {
      color: var(--cyan);
      transform: translate(.75rem, -17px) scale(.75);
      z-index: 1;
    }
  }

  &.thin {
    height: 38px;

    .input-wrapper {
      height: 38px;
    }
  }

  .error-text {
    margin-top: .5rem;
    margin-right: 1rem;
  }

  &.error {
    input {
      border-color: var(--red-dark);
    }
  }

  &.active {
    .input-wrapper {
      border: 2px solid var(--cyan);
    }
  }

  &.disabled {
    opacity: .5;
    cursor: not-allowed;

    .input-wrapper {
      cursor: not-allowed;
    }

    .place-holder {
      cursor: not-allowed;
    }

    input {
      cursor: not-allowed;
    }
  }
}
</style>
