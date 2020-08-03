import React from 'react' 
import NavigationItems from './NavigationItems'
import NavigationItem from '../NavigationItem/NavigationItem'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// connect enzyme
configure({adapter : new Adapter()}) 

describe('Testing <NavigationItems />', () => {
    // run a beforeEach
    const wrapper = shallow(<NavigationItems/>)

    it('should render two navigation items if not authenticated', () => {
    
        expect(wrapper.find(NavigationItem)).toHaveLength(2)
    })

    it('should render three navigation items when authenticated', () => {
        wrapper.setProps({ isAuthenticated : true })
        expect(wrapper.find(NavigationItem)).toHaveLength(3)  
    })

    it('should render a logout link', () => {
        wrapper.setProps({ isAuthenticated: true })
        expect(wrapper.contains(<NavigationItem  link="/logout">Logout</NavigationItem>)).toEqual(true)
    })

})