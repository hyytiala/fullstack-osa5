import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import TogglableBlog from './components/TogglableBlog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
    let app
    describe('not logged', () => {
        beforeEach(() => {
            app = mount(<App />)
        })

        it('renders', () => {
            app.update()
            const blogComponents = app.find(TogglableBlog)
            expect(blogComponents.length).toEqual(0)
        })
    })

    describe('logged in', () => {
        beforeEach(() => {
            const user = {
                username: 'otto',
                token: '1231231214',
                name: 'Otto Testaaja'
            }

            localStorage.setItem('loggedUser', JSON.stringify(user))
            app = mount(<App />)
        })

        it('renders2', () => {
            app.update()
            const blogComponents = app.find(TogglableBlog)
            expect(blogComponents.length).toEqual(4)
        })
    })
})