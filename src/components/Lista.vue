<script setup>
  import Item from './Item.vue';
  let props = defineProps(["items"])
  defineEmits(["delete_item", "switch_item"])
</script>

<template>
    <ul>
        <li v-for="i in items">
            <item v-bind="i" @delete_item="$emit('delete_item', $event)"
                             @switch_item="$emit('switch_item', $event)"/>
        </li>
    </ul>
</template>