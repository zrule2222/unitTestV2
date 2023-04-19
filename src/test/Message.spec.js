import { mount } from "@vue/test-utils";
import Message from "../Componnents/Message.vue";
import { describe, it, expect } from "vitest";
import {messageToDisplay} from "../Componnents/Message.vue"
import {setMessage} from  "../Componnents/Message.vue"
import {sucess} from "../Componnents/Message.vue"

describe("Modal.vue", () => {

    it("should get the prop Type", () => {
        const type = "sucess";
        const isActive = true;
        const PropText = "sucess";
        const wrapper = mount(Message, {
            propsData: { type,isActive },
        });

        expect(type).toBe(PropText);
    });

    it("should get the empty prop Type", () => {
        const type = "";
        const isActive = true;
        const PropText = "";
        const wrapper = mount(Message, {
            propsData: { type,isActive },
        });

        expect(type).toBe(PropText);
    });

    it("should get the String prop Type", () => {
        const type = 2;
        const isActive = true;
        const PropText = "";
        const wrapper = mount(Message, {
            propsData: { type,isActive },
        });

        expect(type).toBeTypeOf('string');
    });

    it("should get the boolean prop isActive", () => {
        const type = "failure";
        const isActive = true;
        const PropText = "";
        const wrapper = mount(Message, {
            propsData: { type,isActive },
        });

        expect(isActive).toBeTypeOf('boolean')

    });

    it("should fail if prop isActive is not a boolean", () => {
        const type = "failure";
        const isActive = "testas";
        const PropText = "";
        const wrapper = mount(Message, {
            propsData: { type,isActive },
        });

        expect(isActive).toBeTypeOf('boolean')

    });

    it("should emmit on button click", async() => {
        const type = "failure";
        const isActive = "a";
        const PropText = "";
        const wrapper = mount(Message, {
            propsData: { type,isActive },
        });
        const ac = await wrapper.get("button").trigger("click");
        wrapper.vm.$nextTick(() => {
            wrapper.vm.close()
        expect(wrapper.emitted().toEqual(['close-action']))
        })
        
    });

    it("Label should have the text of messageToDisplay", () => {
        messageToDisplay = ""
        sucess = "failure";
        const type = "edit";
        const isActive = true;
        const wrapper = mount(Message, {
            propsData: { type,isActive,sucess },
        });
       wrapper.vm.setMessage()

        expect(wrapper.find("label").text()).toBe("The edit action was a failure")
    });

    it("Div class should be the same value as isActive", () => {
        const type = "edit";
        const isActive = true;
        const wrapper = mount(Message, {
            propsData: { type,isActive,},
        });

        expect(wrapper.find("div").classes("is-active")).toBe(true)
    });

    it("Div class should have the class isActive if prop isActive is true", () => {
        const type = "edit";
        const isActive = true;
        const wrapper = mount(Message, {
            propsData: { type,isActive,},
        });

        expect(wrapper.find("div").classes()).toContain("is-active")
    });
});