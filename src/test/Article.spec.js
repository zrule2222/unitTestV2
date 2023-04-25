import { mount, RouterLinkStub } from "@vue/test-utils";
import ArticleComponent from "../Componnents/Article.vue"
import { describe, it, expect, vi } from "vitest";
import flushPromises from 'flush-promises'
import { createWrapper } from "./mocks/defaultMock"


describe("Article.vue", async () => {


  it("Should set authorName", async () => {

    const Article = {
      id: 1,
      title: "pirmas",
      body: "some comment9",
      author: 1,
      created_at: "2020-01-01 10:12:31",
      updated_at: "2023-02-08 09:36:35"
    }

    const authorName = "Autorius1"


    const wrapper = createWrapper(ArticleComponent, {
      mocks:
      {
        $articles:
        {
          getAuthors: () => {
            return new Promise(resolve => resolve({ name: authorName }))
          }
        }
      },
      propsData: { Article }
    })

    await flushPromises()

    expect(wrapper.vm.$data.AuthorName).toBe(authorName);
  });

  it("No Data was reveived in the component", async () => {

    const Article = {}


    var authorName


    const wrapper = createWrapper(ArticleComponent, {
      mocks:
      {
        $articles:
        {
          getAuthors: () => {
            return new Promise(resolve => resolve({ name: authorName }))
          }
        }
      },
      propsData: { Article }
    })

    await flushPromises()

    expect(wrapper.vm.$data.AuthorName).toBeUndefined();
    expect(wrapper.vm.Article.id).toBeUndefined();
    expect(wrapper.vm.Article.title).toBeUndefined();
    expect(wrapper.vm.Article.body).toBeUndefined();
    expect(wrapper.vm.Article.author).toBeUndefined();
    expect(wrapper.vm.Article.created_at).toBeUndefined();
    expect(wrapper.vm.Article.updated_at).toBeUndefined();
  });

  it("Should set component text from  Article data", async () => {
    const Article = {
      "id": 1,
      "title": "pirmas",
      "body": "some comment9",
      "author": 1,
      "created_at": "2020-01-01 10:12:31",
      "updated_at": "2023-02-08 09:36:35"
    }

    const authorName = "Autorius1"




    const wrapper = createWrapper(ArticleComponent, {
      mocks:
      {
        $articles:
        {
          getAuthors: () => {
            return new Promise(resolve => resolve({ name: authorName }))
          }
        }
      },
      propsData: { Article }
    })

    await flushPromises()


    expect(wrapper.find("#title").text()).toBe(Article.title)
    expect(wrapper.find("#authorName").text()).toBe(authorName)
    expect(wrapper.find("#date").text()).toBe(Article.updated_at)
  });

  it("Should not get the Article component text", async () => {
    const Article = {}

    var authorName




    const wrapper = createWrapper(ArticleComponent, {
      mocks:
      {
        $articles:
        {
          getAuthors: () => {
            return new Promise(resolve => resolve({ name: authorName }))
          }
        }
      },
      propsData: { Article }
    })

    await flushPromises()


    expect(wrapper.find("#title").text()).toBeFalsy
    expect(wrapper.find("#authorName").text()).toBeFalsy
    expect(wrapper.find("#date").text()).toBeFalsy
  });



  it("Should get the edit button emit", async () => {
    const Article = {
      "id": 1,
      "title": "pirmas",
      "body": "some comment9",
      "author": 1,
      "created_at": "2020-01-01 10:12:31",
      "updated_at": "2023-02-08 09:36:35"
    }

    const authorName = "Autorius1"
    const showEditValue = 1

    const wrapper = createWrapper(ArticleComponent, {
      mocks:
      {
        $articles:
        {
          getAuthors: () => {
            return new Promise(resolve => resolve({ name: authorName }))
          }
        }
      },
      propsData: { Article }
    })


    await flushPromises()
    let button = await wrapper.find('#edit').trigger('click')
    await wrapper.vm.$nextTick() // Wait until $emits have been handled

    expect(wrapper.emitted('show-edit')).toStrictEqual([[showEditValue]])

  });

  it("The edit button should emit no value", async () => {
    const Article = {}

    const authorName = "Autorius1"
    var showEditValue

    const wrapper = createWrapper(ArticleComponent, {
      mocks:
      {
        $articles:
        {
          getAuthors: () => {
            return new Promise(resolve => resolve({ name: authorName }))
          }
        }
      },
      propsData: { Article }
    })


    await flushPromises()
    let button = await wrapper.find('#edit').trigger('click')
    await wrapper.vm.$nextTick() // Wait until $emits have been handled

    expect(wrapper.emitted('show-edit')).toStrictEqual([[showEditValue]])

  });

  it("Should delete article and emit delete sucess", async () => {
    const Article = {
      "id": 1,
      "title": "pirmas",
      "body": "some comment9",
      "author": 1,
      "created_at": "2020-01-01 10:12:31",
      "updated_at": "2023-02-08 09:36:35"
    }
    const authorName = "Autorius1"
    const actionType = 'delete'
    const sucess = 'sucess'

    const wrapper = createWrapper(ArticleComponent, {
      mocks:
      {
        $articles:
        {
          getAuthors: () => {
            return new Promise(resolve => resolve({ name: authorName }))
          },
          deleteArticle: () => {
            return new Promise(resolve => resolve())
          }
        }
      },
      propsData: { Article }
    })

    await flushPromises()
    let button = await wrapper.find('#delete').trigger('click')
    await wrapper.vm.$nextTick() // Wait until $emits have been handled
    window.confirm = vi.fn().mockImplementation(() => true)
    await wrapper.findAll('button').at(2).trigger('click')
    expect(wrapper.emitted('delete-action')).toStrictEqual([[{ actionType: actionType, sucess: sucess }]])

  });

  it("Should fail to delete article and emit delete fail", async () => {
    const Article = {
      "id": 1,
      "title": "pirmas",
      "body": "some comment9",
      "author": 1,
      "created_at": "2020-01-01 10:12:31",
      "updated_at": "2023-02-08 09:36:35"
    }
    const authorName = "Autorius1"
    const actionType = 'delete'
    const sucess = 'failure'

    const wrapper = createWrapper(ArticleComponent, {
      mocks:
      {
        $articles:
        {
          getAuthors: () => {
            return new Promise(resolve => resolve({ name: authorName }))
          },
          deleteArticle: () => {
            return new Promise(() => reject())
          }
        }
      },
      propsData: { Article }
    })

    await flushPromises()
    let button = await wrapper.find('#delete').trigger('click')
    await wrapper.vm.$nextTick() // Wait until $emits have been handled
    expect(wrapper.emitted('delete-action')).toStrictEqual([[{ actionType: actionType, sucess: sucess }]])

  });

  it("Should set the correcter router link to prop", async () => {
    vi.mock('vue-router')
    const Article = {
      "id": 1,
      "title": "pirmas",
      "body": "some comment9",
      "author": 1,
      "created_at": "2020-01-01 10:12:31",
      "updated_at": "2023-02-08 09:36:35"
    }
    const authorName = "Autorius1"
    const name = 'SpesificArticle'
    const params = { id: 1 }
    const wrapper = createWrapper(ArticleComponent, {
      mocks:
      {
        $articles:
        {
          getAuthors: () => {
            return new Promise(resolve => resolve({ name: authorName }))
          },
          deleteArticle: () => {
            return new Promise(() => reject())
          }
        }
      },
      stubs: {
        RouterLink: RouterLinkStub
      },
      propsData: { Article }
    })

    expect(wrapper.find('#redirectToArticle').props().to).toStrictEqual({ name: name, params: params })
  });

});