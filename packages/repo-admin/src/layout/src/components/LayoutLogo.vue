<template>
  <div class="overflow-hidden">
    <PeaceSvgIcon class="w-8 h-8" name="Logo"></PeaceSvgIcon>
    <div class="ml-4 whitespace-nowrap" v-show="!layoutStore.siderCollapse">System Name</div>
  </div>
</template>

<script setup lang="ts">
import { PeaceSvgIcon } from 'peace-components'
import { useLayoutStore } from '@/store'

const layoutStore = useLayoutStore()
</script>
