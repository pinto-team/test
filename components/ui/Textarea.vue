<script setup lang="ts">
import { computed, ref, type ComputedRef, type Ref, type ModelRef } from 'vue';
import Text from './Text.vue';
type TextareaProps = {
    type: 'text' | 'email' | 'password' | 'search'
    bgc: 'transparent' | 'secondary'
    placeholder: string
    disabled: boolean
    hasError: boolean
    errorText: string
    isActive: boolean
    delay: boolean
}
const textareaRef: Ref<HTMLTextAreaElement | null> = ref(null)
const props: Readonly<TextareaProps> = defineProps<TextareaProps>()
const modelValue: ModelRef<string> = defineModel<string>({ required: false, default: '' })
const timeOut: Ref<number> = ref(0)
const emit = defineEmits(['keyup', 'update:modelValue', 'submit'])
const isFocused: Ref<boolean> = ref(false)
const textareaClass: ComputedRef<string> = computed(() => {
    const classNames: string[] = ['ui-textarea-input']
    classNames.push(props.bgc)
    if (props.disabled) classNames.push('disabled')
    if (props.hasError) classNames.push('error')
    if (props.isActive) classNames.push('active')
    if (isFocused.value) classNames.push('focused')
    if (modelValue.value.length > 0) classNames.push('filled')
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
    <div :class="textareaClass">
        <div class="input-wrapper" @click="textareaRef?.focus()">
            <textarea
                ref="textareaRef"
                :disabled="props.disabled"
                :value="modelValue"
                @blur="isFocused = false"
                @focus="isFocused = true"
                @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
                @keyup="emitKeyup(($event.target as HTMLTextAreaElement).value)"
                @keyup.enter="emit('submit')"/>
            <Text :class="'place-holder'" :color="'secondary64'" :wrap="'nowrap'" :text-style="'14M'" :text-align="'center'"
                :tag="'span'">
                <template #text>
                    {{ props.placeholder }}
                </template>
            </Text>
            <div class="icon">
                <slot name="icon"></slot>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.ui-textarea-input {
    width: 100%;
    height: fit-content;
    position: relative;
    .input-wrapper {
        width: 100%;
        height: fit-content;
        border: 2px solid var(--light-secondary-64);
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: .5rem;
        cursor: text;
    }
    textarea {
        width: 100%;
        min-height: 128px;
        max-height: 200px;
        height: fit-content;
        background-color: var(--white);
        color: var(--light-secondary-64);
        padding: 1rem;
        border-radius: .5rem;
        resize: none;
        @include typo14R();
    }
    .icon {
        text-align: left;
        padding: 1rem .5rem;
    }
    .place-holder {
      position: absolute;
      height: fit-content;
      width: fit-content;
      top: 1rem;
      color: var(--light-secondary-64);
      padding: 0 0.25rem;
      transition: transform 0.35s ease;
      transform: translate(-.25rem, 0);
    }
    &.focused {
        .input-wrapper {
            border-color: var(--cyan);
        }
        .place-holder {
          color: var(--cyan);
          transform: translate(.75rem, -17px) scale(.75);
          z-index: 1;
        }
        .icon {
            :deep(.ui-button) {
                background-color: var(--primary08);
            }
            :deep(.ui-icon) {
                color: var(--cyan);
            }
            :deep(.ui-text) {
                color: var(--cyan);
            }
        }
    }

    .error-text {
        margin-top: .5rem;
    }

    &.active {
        .input-wrapper {
            border-color: var(--cyan);
        }
    }
    &.filled {
        .place-holder {
          color: var(--cyan);
          transform: translate(.75rem, -17px) scale(.75);
          z-index: 1;
        }
        input {
            color: var(--light-secondary-64);
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
        textarea {
            cursor: not-allowed;
        }
    }
}
</style>