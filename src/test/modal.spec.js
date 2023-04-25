
import modal from "../Componnents/modal.vue"
import { describe, it, expect } from "vitest";
import flushPromises from 'flush-promises'
import { createWrapper } from "./mocks/defaultMock"

describe("modal.vue", () => {

    it("Should set component data", async () => {
       
        const actionType = 'edit'
        const editIndex = 1
        const isActive = true
        const Authors = [
            {
              "id": 1,
              "name": "Autorius1",
              "created_at": "",
              "updated_at": ""
            },
            {
              "id": 2,
              "name": "Autorius2",
              "created_at": "a",
              "updated_at": "b"
            }
          ]
          const article = {
            id: 1,
            title: "pirmas",
            body: "some comment9",
            author: 1,
            created_at: "2020-01-01 10:12:31",
            updated_at: "2023-02-08 09:36:35"
          }


          const wrapper = createWrapper(modal, {
            mocks:{
              $articles:{
                getAuthors: () => {
                  return new Promise(resolve => resolve(Authors))
                },
                getArticles: () => {
                  return new Promise(resolve => resolve(article))
                }
              }
            },
            propsData: { actionType,editIndex,isActive },
          })
 
       await flushPromises()

        expect(wrapper.vm.$data.title).toBe(article.title);
        expect(wrapper.vm.$data.content).toBe(article.body);
        expect(wrapper.vm.$data.author).toBe(article.author);
        expect(wrapper.vm.$data.Authors).toBe(Authors);
    });

    it("Should fail to set component data", async () => {
       
      const actionType = 'edit'
      const editIndex = 1
      const isActive = true
      var Authors 
        const article = { }


        const wrapper = createWrapper(modal, {
          mocks:{
            $articles:{
              getAuthors: () => {
                return new Promise(resolve => resolve(Authors))
              },
              getArticles: () => {
                return new Promise(resolve => resolve(article))
              }
            }
          },
          propsData: { actionType,editIndex,isActive },
        })

     await flushPromises()

      expect(wrapper.vm.$data.title).toBeUndefined()
      expect(wrapper.vm.$data.content).toBeUndefined()
      expect(wrapper.vm.$data.author).toBeUndefined()
      expect(wrapper.vm.$data.Authors).toBeUndefined()
  });

    it("Should set props correctly", async () => {
       
        const actionType = 'edit'
        const editIndex = 1
        const isActive = true
        const Authors = [
            {
              "id": 1,
              "name": "Autorius1",
              "created_at": "",
              "updated_at": ""
            },
            {
              "id": 2,
              "name": "Autorius2",
              "created_at": "a",
              "updated_at": "b"
            }
          ]
          const article = {
            id: 1,
            title: "pirmas",
            body: "some comment9",
            author: 1,
            created_at: "2020-01-01 10:12:31",
            updated_at: "2023-02-08 09:36:35"
          }


          const wrapper = createWrapper(modal, {
            mocks:{
              $articles:{
                getAuthors: () => {
                  return new Promise(resolve => resolve(Authors))
                },
                getArticles: () => {
                  return new Promise(resolve => resolve(article))
                }
              }
            },
            propsData: { actionType,editIndex,isActive },
          })
 
       await flushPromises()

        expect(wrapper.vm.actionType).toBe(actionType);
        expect(wrapper.vm.editIndex).toBe(editIndex);
        expect(wrapper.vm.isActive).toBe(isActive);
    });

    it("Should fail to set props correctly", async () => {
       
      var actionType
      var editIndex
      var isActive
      const Authors = [
          {
            "id": 1,
            "name": "Autorius1",
            "created_at": "",
            "updated_at": ""
          },
          {
            "id": 2,
            "name": "Autorius2",
            "created_at": "a",
            "updated_at": "b"
          }
        ]
        const article = {
          id: 1,
          title: "pirmas",
          body: "some comment9",
          author: 1,
          created_at: "2020-01-01 10:12:31",
          updated_at: "2023-02-08 09:36:35"
        }


        const wrapper = createWrapper(modal, {
          mocks:{
            $articles:{
              getAuthors: () => {
                return new Promise(resolve => resolve(Authors))
              },
              getArticles: () => {
                return new Promise(resolve => resolve(article))
              }
            }
          },
          propsData: { actionType,editIndex,isActive },
        })

     await flushPromises()

      expect(wrapper.vm.actionType).toBeFalsy()
      expect(wrapper.vm.editIndex).toBeFalsy()
      expect(wrapper.vm.isActive).toBeFalsy()
  });

    it("Should get the paragraph with text Edit Article", async () => {
       
        const actionType = 'edit'
        const editIndex = 1
        const isActive = true
        const Authors = [
            {
              "id": 1,
              "name": "Autorius1",
              "created_at": "",
              "updated_at": ""
            },
            {
              "id": 2,
              "name": "Autorius2",
              "created_at": "a",
              "updated_at": "b"
            }
          ]
          const article = {
            id: 1,
            title: "pirmas",
            body: "some comment9",
            author: 1,
            created_at: "2020-01-01 10:12:31",
            updated_at: "2023-02-08 09:36:35"
          }
          const headerText = "Edit Article"


          const wrapper = createWrapper(modal, {
            mocks:{
              $articles:{
                getAuthors: () => {
                  return new Promise(resolve => resolve(Authors))
                },
                getArticles: () => {
                  return new Promise(resolve => resolve(article))
                }
              }
            },
            propsData: { actionType,editIndex,isActive },
          })
 
       await flushPromises()

       expect(wrapper.find('#editArticle').text()).toBe(headerText)
    });

    it("Should get the paragraph with text Add Article", async () => {
       
        const actionType = 'create'
        const editIndex = 1
        const isActive = true
        const Authors = [
            {
              "id": 1,
              "name": "Autorius1",
              "created_at": "",
              "updated_at": ""
            },
            {
              "id": 2,
              "name": "Autorius2",
              "created_at": "a",
              "updated_at": "b"
            }
          ]
          const article = {
            id: 1,
            title: "pirmas",
            body: "some comment9",
            author: 1,
            created_at: "2020-01-01 10:12:31",
            updated_at: "2023-02-08 09:36:35"
          }

          const headerText = "Add Article"

          const wrapper = createWrapper(modal, {
            mocks:{
              $articles:{
                getAuthors: () => {
                  return new Promise(resolve => resolve(Authors))
                },
                getArticles: () => {
                  return new Promise(resolve => resolve(article))
                }
              }
            },
            propsData: { actionType,editIndex,isActive },
          })
 
       await flushPromises()

       expect(wrapper.find('#addArticle').text()).toBe(headerText)
    });

    it("Check that title is empty", async () => {
       
        const actionType = 'create'
        const editIndex = 1
        const isActive = true
        const Authors = [
            {
              "id": 1,
              "name": "Autorius1",
              "created_at": "",
              "updated_at": ""
            },
            {
              "id": 2,
              "name": "Autorius2",
              "created_at": "a",
              "updated_at": "b"
            }
          ]
          const article = {
            id: 1,
            title: "pirmas",
            body: "some comment9",
            author: 1,
            created_at: "2020-01-01 10:12:31",
            updated_at: "2023-02-08 09:36:35"
          }
          const titleText = "Tittle is empty"
          const titleClass = "is-danger"


          const wrapper = createWrapper(modal, {
            mocks:{
              $articles:{
                getAuthors: () => {
                  return new Promise(resolve => resolve(Authors))
                },
                getArticles: () => {
                  return new Promise(resolve => resolve(article))
                }
              }
            },
            propsData: { actionType,editIndex,isActive },
          })
          let button = await wrapper.find('#doAction').trigger('click')
          await wrapper.vm.$nextTick() // Wait until $emits have been handled
 
       await flushPromises()

       expect(wrapper.find('#titleEmpty').text()).toBe(titleText)
       expect(wrapper.find('#titleImput').classes(titleClass)).toBe(true)
    });

    it("Check that author is empty", async () => {
       
        const actionType = 'create'
        const editIndex = 1
        const isActive = true
        const Authors = [
            {
              "id": 1,
              "name": "Autorius1",
              "created_at": "",
              "updated_at": ""
            },
            {
              "id": 2,
              "name": "Autorius2",
              "created_at": "a",
              "updated_at": "b"
            }
          ]
          const article = {
            id: 1,
            title: "pirmas",
            body: "some comment9",
            author: 1,
            created_at: "2020-01-01 10:12:31",
            updated_at: "2023-02-08 09:36:35"
          }
          const authorText = "Author not selected"
          const authorClass = "is-danger"

          const wrapper = createWrapper(modal, {
            mocks:{
              $articles:{
                getAuthors: () => {
                  return new Promise(resolve => resolve(Authors))
                },
                getArticles: () => {
                  return new Promise(resolve => resolve(article))
                }
              }
            },
            propsData: { actionType,editIndex,isActive },
          })
          await wrapper.setData({ title: 'title' })
          let button = await wrapper.find('#doAction').trigger('click')
          await wrapper.vm.$nextTick() // Wait until $emits have been handled
 
       await flushPromises()

       expect(wrapper.find('#AuthorSelect').classes(authorClass)).toBe(true)
       expect(wrapper.find('#noAuthor').text()).toBe(authorText)
       
    });

    it("Check that content is empty", async () => {
       
        const actionType = 'create'
        const editIndex = 1
        const isActive = true
        const Authors = [
            {
              "id": 1,
              "name": "Autorius1",
              "created_at": "",
              "updated_at": ""
            },
            {
              "id": 2,
              "name": "Autorius2",
              "created_at": "a",
              "updated_at": "b"
            }
          ]
          const article = {
            id: 1,
            title: "pirmas",
            body: "some comment9",
            author: 1,
            created_at: "2020-01-01 10:12:31",
            updated_at: "2023-02-08 09:36:35"
          }

          const contentText = "Content is empty"
          const contentClass = "is-danger"

          const wrapper = createWrapper(modal, {
            mocks:{
              $articles:{
                getAuthors: () => {
                  return new Promise(resolve => resolve(Authors))
                },
                getArticles: () => {
                  return new Promise(resolve => resolve(article))
                }
              }
            },
            propsData: { actionType,editIndex,isActive },
          })
          await wrapper.setData({ title: 'title' })
          await wrapper.setData({ author: 2 })
          let button = await wrapper.find('#doAction').trigger('click')
          await wrapper.vm.$nextTick() // Wait until $emits have been handled
 
       await flushPromises()

       expect(wrapper.find('#textArea').classes(contentClass)).toBe(true)
       expect(wrapper.find('#noContent').text()).toBe(contentText)
       
    });

    it("Should emit close after clicking close button", async () => {
       
        const actionType = 'create'
        const editIndex = 1
        const isActive = true
        const Authors = [
            {
              "id": 1,
              "name": "Autorius1",
              "created_at": "",
              "updated_at": ""
            },
            {
              "id": 2,
              "name": "Autorius2",
              "created_at": "a",
              "updated_at": "b"
            }
          ]
          const article = {
            id: 1,
            title: "pirmas",
            body: "some comment9",
            author: 1,
            created_at: "2020-01-01 10:12:31",
            updated_at: "2023-02-08 09:36:35"
          }


          const wrapper = createWrapper(modal, {
            mocks:{
              $articles:{
                getAuthors: () => {
                  return new Promise(resolve => resolve(Authors))
                },
                getArticles: () => {
                  return new Promise(resolve => resolve(article))
                }
              }
            },
            propsData: { actionType,editIndex,isActive },
          })

          let button = await wrapper.find('#closeButton').trigger('click')
          await wrapper.vm.$nextTick() // Wait until $emits have been handled
 
       await flushPromises()

       expect(wrapper.emitted().close).toStrictEqual([[]])
       
    });

    it("Should create a new article", async () => {
       
        const actionType = 'create'
        const editIndex = 1
        const isActive = true
        const Authors = [
            {
              "id": 1,
              "name": "Autorius1",
              "created_at": "",
              "updated_at": ""
            },
            {
              "id": 2,
              "name": "Autorius2",
              "created_at": "a",
              "updated_at": "b"
            }
          ]
          const article = {
            id: 1,
            title: "pirmas",
            body: "some comment9",
            author: 1,
            created_at: "2020-01-01 10:12:31",
            updated_at: "2023-02-08 09:36:35"
          }

          const type = 'create'
          const sucess = 'sucess'


          const wrapper = createWrapper(modal, {
            mocks:{
              $articles:{
                getAuthors: () => {
                  return new Promise(resolve => resolve(Authors))
                },
                getArticles: () => {
                  return new Promise(resolve => resolve(article))
                },
                postArticle: () =>{
                  return new Promise( resolve => resolve({
                      title: "test",
                      body: "test",
                      author: 1,
                  }))
              }
            },
            propsData: { actionType,editIndex,isActive },
          }})
          await wrapper.setData({ title: 'test' })
          await wrapper.setData({ author: 1 })
          await wrapper.setData({ content: 'test' })
          let button = await wrapper.find('#doAction').trigger('click')
          await wrapper.vm.$nextTick() // Wait until $emits have been handled
 
       await flushPromises()

       expect(wrapper.emitted('close-after-action')).toStrictEqual([[{type: type,sucess: sucess}]])
       
    });

    it("Should fail to post article", async () => {
       
        const actionType = 'create'
        const editIndex = 1
        const isActive = true
        const Authors = [
            {
              "id": 1,
              "name": "Autorius1",
              "created_at": "",
              "updated_at": ""
            },
            {
              "id": 2,
              "name": "Autorius2",
              "created_at": "a",
              "updated_at": "b"
            }
          ]
          const article = {
            id: 1,
            title: "pirmas",
            body: "some comment9",
            author: 1,
            created_at: "2020-01-01 10:12:31",
            updated_at: "2023-02-08 09:36:35"
          }
          const type = 'create'
          const sucess = 'failure'


          const wrapper = createWrapper(modal, {
            mocks:{
              $articles:{
                getAuthors: () => {
                  return new Promise(resolve => resolve(Authors))
                },
                getArticles: () => {
                  return new Promise(resolve => resolve(article))
                },
                postArticle: () =>{
                  return new Promise( () => reject())
                }
            },
            propsData: { actionType,editIndex,isActive },
          }})
          await wrapper.setData({ title: 'test' })
          await wrapper.setData({ author: 1 })
          await wrapper.setData({ content: 'test' })
          let button = await wrapper.find('#doAction').trigger('click')
          await wrapper.vm.$nextTick() // Wait until $emits have been handled
 
       await flushPromises()

       expect(wrapper.emitted('close-after-action')).toStrictEqual([[{type: type,sucess: sucess}]])
       
    });

    it("Should update article", async () => {
       
        const actionType = 'edit'
        const editIndex = 1
        const isActive = true
        const Authors = [
            {
              "id": 1,
              "name": "Autorius1",
              "created_at": "",
              "updated_at": ""
            },
            {
              "id": 2,
              "name": "Autorius2",
              "created_at": "a",
              "updated_at": "b"
            }
          ]
          const article = {
            id: 1,
            title: "pirmas",
            body: "some comment9",
            author: 1,
            created_at: "2020-01-01 10:12:31",
            updated_at: "2023-02-08 09:36:35"
          }

          const type = 'update'
          const sucess = 'sucess'


                    const wrapper = createWrapper(modal, {
            mocks:{
              $articles:{
                getAuthors: () => {
                  return new Promise(resolve => resolve(Authors))
                },
                getArticles: () => {
                  return new Promise(resolve => resolve(article))
                },
                updateArticle: () => {
                 return new Promise( resolve => resolve())
               }
            },
          },
          propsData: { actionType,editIndex,isActive }
        })
          await wrapper.setData({ title: article.title })
          await wrapper.setData({ author: article.author })
          await wrapper.setData({ content: article.body})
          let button = await wrapper.find('#doAction').trigger('click')
          await wrapper.vm.$nextTick() // Wait until $emits have been handled
 
       await flushPromises()

       expect(wrapper.emitted('close-after-action')).toStrictEqual([[{type: type,sucess: sucess}]])
       
    });

    it("Should fail to update article", async () => {
       
        const actionType = 'edit'
        const editIndex = 1
        const isActive = true
        const Authors = [
            {
              "id": 1,
              "name": "Autorius1",
              "created_at": "",
              "updated_at": ""
            },
            {
              "id": 2,
              "name": "Autorius2",
              "created_at": "a",
              "updated_at": "b"
            }
          ]
          const article = {
            id: 1,
            title: "pirmas",
            body: "some comment9",
            author: 1,
            created_at: "2020-01-01 10:12:31",
            updated_at: "2023-02-08 09:36:35"
          }

          const type = 'update'
          const sucess = 'failure'


          const wrapper = createWrapper(modal, {
            mocks:{
              $articles:{
                getAuthors: () => {
                  return new Promise(resolve => resolve(Authors))
                },
                getArticles: () => {
                  return new Promise(resolve => resolve(article))
                },
                updateArticle: () =>{
                  return new Promise( () => reject())
                }
            },
          },
          propsData: { actionType,editIndex,isActive }
        })
          await wrapper.setData({ title: article.title })
          await wrapper.setData({ author: article.author })
          await wrapper.setData({ content: article.body})
          let button = await wrapper.find('#doAction').trigger('click')
          await wrapper.vm.$nextTick() // Wait until $emits have been handled
 
       await flushPromises()

       expect(wrapper.emitted('close-after-action')).toStrictEqual([[{type: type,sucess: sucess}]])
       
    });

    it("isActive class should be set on a div", async () => {
       
        const actionType = 'edit'
        const editIndex = 1
        const isActive = true
        const Authors = [
            {
              "id": 1,
              "name": "Autorius1",
              "created_at": "",
              "updated_at": ""
            },
            {
              "id": 2,
              "name": "Autorius2",
              "created_at": "a",
              "updated_at": "b"
            }
          ]
          const article = {
            id: 1,
            title: "pirmas",
            body: "some comment9",
            author: 1,
            created_at: "2020-01-01 10:12:31",
            updated_at: "2023-02-08 09:36:35"
          }

          const className = "is-active"


          const wrapper = createWrapper(modal, {
            mocks:{
              $articles:{
                getAuthors: () => {
                  return new Promise(resolve => resolve(Authors))
                },
                getArticles: () => {
                  return new Promise(resolve => resolve(article))
                }
              }
            },
            propsData: { actionType,editIndex,isActive },
          })

 
       await flushPromises()

       expect(wrapper.find("#isActiveDiv").classes(className)).toBe(true)
       
    });

    it("isActive class should not be set on a div", async () => {
       
      const actionType = 'edit'
      const editIndex = 1
      var isActive 
      const Authors = [
          {
            "id": 1,
            "name": "Autorius1",
            "created_at": "",
            "updated_at": ""
          },
          {
            "id": 2,
            "name": "Autorius2",
            "created_at": "a",
            "updated_at": "b"
          }
        ]
        const article = {
          id: 1,
          title: "pirmas",
          body: "some comment9",
          author: 1,
          created_at: "2020-01-01 10:12:31",
          updated_at: "2023-02-08 09:36:35"
        }

        const className = "is-active"


        const wrapper = createWrapper(modal, {
          mocks:{
            $articles:{
              getAuthors: () => {
                return new Promise(resolve => resolve(Authors))
              },
              getArticles: () => {
                return new Promise(resolve => resolve(article))
              }
            }
          },
          propsData: { actionType,editIndex,isActive },
        })


     await flushPromises()

     expect(wrapper.find("#isActiveDiv").classes(className)).toBeFalsy()
     
  });

    
});