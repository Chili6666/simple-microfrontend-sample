import { defineComponent, h, onMounted, ref } from "vue";
import type { Component } from "vue";

export const ReactRemoteWrapper = defineComponent({
  name: "ReactRemoteWrapper",
  setup() {
    const RemoteApp = ref<Component | null>(null);

    onMounted(async () => {
      try {
        console.log("Loading remote component...");
        const module = await import("mfe3/remote-app");
        RemoteApp.value = module.default;
      } catch (err) {
        console.error("Failed to load remote component:", err);
      }
    });

    return () => {
      if (RemoteApp.value) {
        console.log("before...");
        const tt = h(RemoteApp.value);
        console.log("after.....");
        return tt;
        //return h(RemoteApp.value)
      }
      return h("div", "Loading remote component...");
    };
  },
});
