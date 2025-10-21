<script setup lang="ts">
import {type ComputedRef, computed} from "vue";

type TextTags = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p";
type TextColors = "black" | "white" | "secondary64";

type TextStyles =
    '46B'
    | '46M'
    | '46R'
    | '28B9'
    | '28B'
    | '28M'
    | '26B'
    | '20B'
    | '20M'
    | '20R'
    | '18B'
    | '18M'
    | '18R'
    | '16B'
    | '16M'
    | '16R'
    | '14B'
    | '14M'
    | '14R'
    | '12B'
    | '12M'
    | '12R'
    | '10B'
    | '10M'
    | '10R'

type HoverColors = "inherit" | "none";
type TextProps = {
  textStyle: TextStyles
  color: TextColors;
  wrap: "nowrap" | "wrap";
  tag: TextTags;
  textAlign: "right" | "center" | "left";
  noTransition?: boolean;
  hoverColors?: HoverColors;
};
const props: Readonly<TextProps> = defineProps<TextProps>();
const textClass: ComputedRef<string> = computed(() => {
  const classNames: string[] = ["ui-text"];
  classNames.push(props.color);
  classNames.push('typo-'+ props.textStyle)
  classNames.push("hover-" + props.hoverColors);
  classNames.push(props.textAlign);
  classNames.push(props.wrap);
  if (props.noTransition) classNames.push("no-transition");
  return classNames.join(" ");
});
</script>
<template>
  <component :is="props.tag" :class="textClass">
    <slot name="text"></slot>
  </component>
</template>
<style scoped lang="scss">
.ui-text {
  &.black {
    color: var(--light-secondary-100);
  }

  &.white {
    color: var(--basic-white);
  }

  &.secondary64 {
    color: var(--light-secondary-64);
  }

  &.right {
    text-align: right;
  }

  &.left {
    text-align: left;
  }

  &.center {
    text-align: center;
  }

  &.nowrap {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &.no-transition {
    transition: none;
    transition-duration: 0s;
  }

  &.typo {

    &-46 {
      &B {
        @include typo46B;
      }

      &M {
        @include typo46M;
      }

      &R {
        @include typo46R;
      }
    }

    &-28 {
      &B9 {
        @include typo28B9;
      }

      &B {
        @include typo28B;
      }

      &M {
        @include typo28M;
      }

      &R {
        @include typo28R;
      }
    }

    &-26 {
      &B {
        @include typo26B;
      }

      &M {
        @include typo26M;
      }

      &R {
        @include typo26R;
      }
    }

    &-20 {
      &B {
        @include typo20B;
      }

      &M {
        @include typo20M;
      }

      &R {
        @include typo20R;
      }
    }

    &-18 {
      &B {
        @include typo18B;
      }

      &M {
        @include typo18M;
      }

      &R {
        @include typo18R;
      }
    }

    &-16 {
      &B {
        @include typo16B;
      }

      &M {
        @include typo16M;
      }

      &R {
        @include typo16R;
      }
    }

    &-14 {
      &B {
        @include typo14B;
      }

      &M {
        @include typo14M;
      }

      &R {
        @include typo14R;
      }
    }

    &-12 {
      &B {
        @include typo12B;
      }

      &M {
        @include typo12M;
      }

      &R {
        @include typo12R;
      }
    }

    &-10 {
      &B {
        @include typo10B;
      }

      &M {
        @include typo10M;
      }

      &R {
        @include typo10R;
      }
    }
  }

  &.hover {
    &-inherit {
      &:hover {
        color: inherit;
      }
    }
  }
}
</style>
