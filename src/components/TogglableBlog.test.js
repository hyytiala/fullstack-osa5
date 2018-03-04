import React from 'react'
import { shallow } from 'enzyme'
import TogglableBlog from './TogglableBlog';

describe.only('<TogglableBlog />', () => {
    let blog

    beforeEach(() => {
        blog = {
            title: 'otsikko',
            author: 'kirjailija',
            url: 'www.jotain.fi',
            likes: 1
        }
    })

    it('renders', () => {
        const blogComponent = shallow(<TogglableBlog blog={blog} />)
        //console.log(blogComponent.debug())
        const contentDiv = blogComponent.find('.content')
        const hideDiv = blogComponent.find('.hideBlock')
        //console.log(contentDiv.debug())

        expect(contentDiv.text()).toContain(blog.title)
        expect(contentDiv.text()).toContain(blog.author)
        expect(hideDiv.getElement().props.style).toEqual({ display: 'none' })
    })

    it('button calls hendler', () => {

        const blogComponent = shallow(<TogglableBlog blog={blog}/>)
        const button = blogComponent.find('.textButton')
        button.simulate('click')
        const hideDiv = blogComponent.find('.hideBlock')

        expect(hideDiv.getElement().props.style).toEqual({ display: '' })
        expect(hideDiv.text()).toContain(blog.url)
        expect(hideDiv.text()).toContain(blog.likes)
    })

})