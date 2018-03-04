import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimleBlog />', () => {

    it('renders', () => {
        const blog = {
            title: 'otsikko',
            author: 'kirjailija',
            url: 'www.jotain.fi',
            likes: 1
        }

        const blogComponent = shallow(<SimpleBlog blog={blog}/>)
        const contentDiv = blogComponent.find('.content')

        expect(contentDiv.text()).toContain(blog.title)
        expect(contentDiv.text()).toContain(blog.author)
        expect(contentDiv.text()).toContain(blog.likes)
    })

    it('button calls hendler', () => {
        const blog = {
            title: 'otsikko',
            author: 'kirjailija',
            url: 'www.jotain.fi',
            likes: 1
        }

        const mockHandler = jest.fn()
        const blogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler}/>)

        const button = blogComponent.find('button')
        button.simulate('click')
        button.simulate('click')

        expect(mockHandler.mock.calls.length).toBe(2)
    })

})