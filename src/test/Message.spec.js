
import Message from "../Componnents/Message.vue";
import { describe, it, expect } from "vitest";
import {messageToDisplay} from "../Componnents/Message.vue"
import {sucess} from "../Componnents/Message.vue"
import { createWrapper } from "./mocks/defaultMock"



describe("Message.vue", () => {

    it("Should get the correct prop types", () => {
        const type = "sucess";
        const isActive = true;
        const typePropType = "string";
        const isActivePropType = "boolean";
        const wrapper = createWrapper(Message, {
            propsData: { type,isActive }
          })

        expect(wrapper.vm.type).toBeTypeOf(typePropType);
        expect(wrapper.vm.isActive).toBeTypeOf(isActivePropType);
    });

    it("Should get the prop values", () => {
        const type = "sucess";
        const isActive = true;
        const typePropValue = "sucess";
        const isActivePropValue = true;
        const wrapper = createWrapper(Message, {
            propsData: { type,isActive }
          })

        expect(wrapper.vm.type).toBe(typePropValue);
        expect(wrapper.vm.isActive).toBe(isActivePropValue);
    });

    it("Check values of elements that are using props when pros are empty", () => {
        let type 
        let isActive 
        const typePropValue = "sucess";
        const isActivePropValue = true;
        const className = "is-active"
        const wrapper = createWrapper(Message, {
            propsData: { type,isActive }
          })
          wrapper.vm.setMessage()

        expect(wrapper.find('#activeDiv').classes(className)).toBeFalsy()
        expect(wrapper.find('#mesageLabel').text()).toBe('The undefined action was a undefined')
    });

    it("Should fail if type is not a string", () => {
        const type = 2;
        const isActive = true;
        const typeOfProp = 'string'
        const wrapper = createWrapper(Message, {
            propsData: { type,isActive }
          })

        expect(type).toBeTypeOf(typeOfProp);
    });

    it("Should fail if prop isActive is not a boolean", () => {
        const type = "failure";
        const isActive = "testas";
        const typeOfProp = 'boolean'
        const wrapper = createWrapper(Message, {
            propsData: { type,isActive }
          })

        expect(isActive).toBeTypeOf(typeOfProp)

    });

    it("Check if prop's get correct value", () => {
        const type = "failure";
        const isActive = true;
        const PropText = "failure";
        const wrapper = createWrapper(Message, {
            propsData: { type,isActive }
          })

        expect(wrapper.vm.isActive).toBe(true)
        expect(wrapper.vm.type).toBe(PropText)

    });

    it("Should emmit on button click", async() => {
        const type = "failure";
        const isActive = "a";
        const PropText = "";
        const emit = 'close-action'
        const wrapper = createWrapper(Message, {
            propsData: { type,isActive }
          })
        const ac = await wrapper.find("#closeButton").trigger("click");
        wrapper.vm.$nextTick(() => {
            wrapper.vm.close()
        expect(wrapper.emitted('close-action')).toBeTruthy()
        })
        
    });

    it("Label should have the text of messageToDisplay", () => {
        messageToDisplay = ""
        sucess = "failure";
        const type = "edit";
        const isActive = true;
        const labelText = "The edit action was a failure"
        const wrapper = createWrapper(Message, {
            propsData: { type,isActive,sucess }
          })
       wrapper.vm.setMessage()

        expect(wrapper.find("#mesageLabel").text()).toBe(labelText)
    });

    it("Div class should be the same value as isActive", () => {
        const type = "edit";
        const isActive = true;
        const className = "is-active"
        const wrapper = createWrapper(Message, {
            propsData: { type,isActive }
          })

        expect(wrapper.find("#activeDiv").classes(className)).toBe(true)
    });

    it("Div class should have the class isActive if prop isActive is true", () => {
        const type = "edit";
        const isActive = true;
         const className = "is-active"
         const wrapper = createWrapper(Message, {
            propsData: { type,isActive }
          })

        expect(wrapper.find("#activeDiv").classes()).toContain(className)
    });
});