
import pagination from "../Componnents/pagination.vue"
import { describe, it, expect } from "vitest";
import {shallowMount } from '@vue/test-utils';
import { createWrapper } from "./mocks/defaultMock"

describe("modal.vue", () => {

    it("Should set props correctly ", async () => {
       
        const pages = 5
        const currentPage = 1

         const wrapper = createWrapper(pagination, {
            propsData: { pages,currentPage}
          })
 

        expect(wrapper.vm.pages).toBe(pages);
        expect(wrapper.vm.currentPage).toBe(currentPage);
    });

    it("Check if is-current class is added when pages and current page are equal", async () => {
       
        const pages = 5
        const currentPage = 5
        const className = "is-current"

        const wrapper = createWrapper(pagination, {
            propsData: { pages,currentPage}
          })
 
        expect(wrapper.find('#page5').classes(className)).toBe(true)
    });

    it("Should emmit after clicking li", async () => {
       
        const pages = 5
        const currentPage = 1
        const clickedPage = 4

        const wrapper = createWrapper(pagination, {
            propsData: { pages,currentPage}
          })

        let button = await wrapper.find(`#page${clickedPage}`).trigger('click')
        await wrapper.vm.$nextTick() // Wait until $emits have been handled
 
     
       expect(wrapper.emitted('onPageChange')).toStrictEqual([[{page: clickedPage}]])
    });


    it("Check if correct number of li is created", async () => {
       
        const pages = 5
        const currentPage = 1

        const wrapper = createWrapper(pagination, {
            propsData: { pages,currentPage}
          })

       
       expect(wrapper.findAll('li').length).toBe(pages)
    });

    it("Check default prop value", async () => {

        
       
        const defaultValue = 1

        const wrapper = shallowMount(pagination, {
        })

       
       expect(wrapper.vm.pages).toBe(defaultValue)
       expect(wrapper.vm.currentPage).toBe(defaultValue)
    });
});