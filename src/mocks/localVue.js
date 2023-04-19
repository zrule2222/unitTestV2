import { vi } from "vitest";
import App from "../App.vue";
import router from "../router";
import axios from "axios";
import articles from "../Services/articleService";
import mockRequests from "../mocks/utils";

//import { library } from "@fortawesome/fontawesome-svg-core";
//import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
//import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createLocalVue } from "@vue/test-utils";

const localVue = createLocalVue();

//library.add(faMagnifyingGlass);

//localVue.component("font-awesome-icon", FontAwesomeIcon);

localVue.prototype.$http = axios;

localVue.use(articles);
localVue.use(router);
localVue.component(App);

vi.doMock("../Services/articleService", async (importOriginal) => {
  const actual = await importOriginal();
  return mockRequests(actual);
});

export default localVue;