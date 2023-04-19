import { mount } from "@vue/test-utils";
import ArticleComponent from "../Componnents/Article.vue"
import { describe, it, expect, vi } from "vitest";
import { getAuthor } from "../Componnents/Article.vue"
import axios from 'axios'
import {articles} from "../Services/articleService.js"
import {shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises'
import { nextTick } from 'vue'
import localVue from "../mocks/localVue";
//vi.mock('axios')
//vi.mock(articles)
//console.log(articles)

// vi.mock('vue-router', () => ({
//   resolve: vi.fn(),
// }));

describe("Article.vue", async () => {
   // articles = vi.fn(() => Promise.resolve([]))
    //vi.fn(getAuthors)
    //  vi.mock('vue-router', () => ({
    //     resolve: vi.fn(),
    //   }));
    //const spy = vi.spyOn(ArticleComponent, 'getAuthors').mockImplementation(() => getAuthors)
    //jest.spyOn(axios, 'get').mockResolvedValue({ data: 'some mocked data!' })

    it("should get the prop Article", async () => {
       
        const Article =    {
            id: 1,
            title: "pirmas",
            body: "some comment9",
            author: 1,
            created_at: "2020-01-01 10:12:31",
            updated_at: "2023-02-08 09:36:35"
          }
        //axios.get.mockResolvedValue({Article})
        // const result  = await $acticles.getAuthors()
        //axios.get.mockResolvedValue({data: Article})
        // jest.spyOn(axios, 'get').mockResolvedValue(Article)
        // await flushPromises()
        const Propvalue =    {
            "id": 1,
            "title": "pirmas",
            "body": "some comment9",
            "author": 1,
            "created_at": "2020-01-01 10:12:31",
            "updated_at": "2023-02-08 09:36:35"
          }
        //   vi.mock("../Services/articleService.js",async () => ({
        //   articles: vi.fn()
        // }));
          //const fn = vi.fn(articles.getAuthors).mockResolvedValueOnce();
          //console.log(await  fn())
          //console.log(await articles.getAuthors())
        //   let a = await articles.getAuthors(Article.author)
        //  console.log(a)
        let aa = Article.author

        const wrapper = mount(ArticleComponent, {
           propsData: { Article },
          mocks:{
            $articles:{
              getAuthors: () => {
                //author = Article.author
              // console.log(author)
                //author = Article.author
                return new Promise(resolve => resolve({name: "Autorius1"}))
              }
            }
          }})
            //localVue,
            //propsData: { Article },

            // mocks:{
            //     AuthorName: ''
            // },
           
        //});
        
        //wrapper.setData({ AuthorName: 'a' });
        //await nextTick()
       await flushPromises()

        expect(wrapper.vm.$data.AuthorName).toBe("Autorius1");
    });

//     it("should get the Article title", async () => {
//         const Article =    {
//             "id": 1,
//             "title": "pirmas",
//             "body": "some comment9",
//             "author": 1,
//             "created_at": "2020-01-01 10:12:31",
//             "updated_at": "2023-02-08 09:36:35"
//           }


          

//         const wrapper = shallowMount(ArticleComponent, {
//             propsData: { Article },
//         });
//         //await flushPromises()


//         expect(wrapper.find("p").text()).toBe("pirmas")
//     });

//     it("should get the Article author", async () => {
//         const Article =    {
//             "id": 1,
//             "title": "pirmas",
//             "body": "some comment9",
//             "author": 1,
//             "created_at": "2020-01-01 10:12:31",
//             "updated_at": "2023-02-08 09:36:35"
//           }


          

//         const wrapper = shallowMount(ArticleComponent, {
//             propsData: { Article },
//         });
//         //await flushPromises()


//         expect(wrapper.findAll("p").at(1).text()).toBe("Autorius1")
//     });

//         it("should get the Article date", async () => {
//         const Article =    {
//             "id": 1,
//             "title": "pirmas",
//             "body": "some comment9",
//             "author": 1,
//             "created_at": "2020-01-01 10:12:31",
//             "updated_at": "2023-02-08 09:36:35"
//           }


          

//         const wrapper = shallowMount(ArticleComponent, {
//             propsData: { Article },
//         });
//         //await flushPromises()


//         expect(wrapper.findAll("p").at(2).text()).toBe("2023-02-08 09:36:35")
//     });

//     it("should get the edit button emit", async () => {
//         const Article =    {
//             "id": 1,
//             "title": "pirmas",
//             "body": "some comment9",
//             "author": 1,
//             "created_at": "2020-01-01 10:12:31",
//             "updated_at": "2023-02-08 09:36:35"
//           }


          

//         const wrapper = shallowMount(ArticleComponent, {
//             propsData: { Article },
//         });
//         //await flushPromises()
//        let button = await wrapper.find('button').trigger('click')
//        await wrapper.vm.$nextTick() // Wait until $emits have been handled

// expect(wrapper.emitted('show-edit')).toBeTruthy()

//         //expect( wrapper.emitted().toEqual(['show-edit']))
//        // expect(wrapper.emitted().toEqual(['show-edit']))
//     });

});