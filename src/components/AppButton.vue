<template>
    <component
        v-if="!to"
        :is="component"
        :href="href"
        :class="[variant, btnSmall ? 'btn_small' : '']"
        :type="type"
        :src="src"
        :icon="icon"
        :alt="alt"
        :form="form"
        :to="to"
        @click="btnClick"
    >
        <slot />
    </component>
    <router-link :to="to" :class="[variant, btnSmall ? 'btn_small' : '']" v-else>
        <slot></slot>
    </router-link>
</template>

<script setup>
import { computed } from 'vue'
const emit = defineEmits(['btnClick']);
const props = defineProps({
    href: {
        type: String,
        required: false,
    },
    to: {
        type: [String, Object],
        required: false,
    },
    variant: {
        type: String,
    },
    type: {
        type: String,
    },
    src: {
        type: String,
        required: false,
    },
    iconType: {
        type: String,
        default: 'fal',
    },
    icon: {
        type: String,
        required: false,
    },
    alt: {
        type: String,
        required: false,
    },
    form: {
        type: String,
        default: '',
    },
    btnSmall: {
        type: Boolean,
        default: false,
    }
})

const component = computed(() => {
    if (props.href != undefined) {
        return 'a'
    }
    return 'button'
})
const btnClick = () => {
    emit('btnClick')
}
</script>

<style scoped>
.btn {
    @apply flex rounded-lg items-center justify-center text-base h-12 cursor-pointer text-center md:px-6 px-4;
}
.btn_small {
    @apply h-8 text-sm pl-[1.125rem] pr-[1.375rem];
}
.btn_label {
    @apply flex rounded-full h-4 items-center justify-center text-xs px-3;
}
.blue {
    @apply bg-blue-500 text-white;
}
.red {
    @apply bg-red-400 text-white border border-red-500;
}
.link-blue {
    @apply text-blue-500 text-base cursor-pointer justify-start;
}
</style>
