<template>
  <div>
    <div>1</div>
    <div>
      <slot name="content">5</slot>
    </div>
    <div>
      <slot name="footer"></slot>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-test'
}
</script>

<style>
</style>
