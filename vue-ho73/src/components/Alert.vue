<template>
  <div class="message-alert">
    <div
      class="alert alert-dismissible"
      :class="'alert-' + item.status"
      v-for="(item, i) in messages"
      :key="i"
    >
      {{ item.message }}
      <button
        type="button"
        class="close"
        @click="removeMessage(i)"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  export default {
    name: "Alert",
    data() {
      return {};
    },
    methods: {
      updateMessage(message, status) {
        this.$store.dispatch("updateMessage", { message, status });
      },
      removeMessage() {
        this.$store.dispatch("removeMessage");
      },
      removeMessageWithTiming(timestamp) {
        this.$store.dispatch("removeMessageWithTiming");
      }
    },
    computed: {
      ...mapGetters(["messages"])
    }
  };
</script>

<style scope>
  .message-alert {
    position: fixed;
    max-width: 50%;
    top: 56px;
    right: 20px;
    z-index: 1100;
  }
  .close {
    outline: none !important;
    box-shadow: none !important;
  }
</style>