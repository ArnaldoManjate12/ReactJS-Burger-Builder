// import React from 'react'
// import {BurgerBuilder } from './BurgerBuilder'
// import BuildControls from '../../components/Burger/BurgerControls/BurgerControls'
// import { configure , shallow } from 'enzyme'
// import Adapter from 'enzyme-adapter-react-16'

// configure({ adapter : new Adapter() })

// describe( 'Testing <BurgerBuilder />', () => {
//     let wrapper 
//     beforeEach(() => {
//         // pass an empty arrow function to fulfil the requirement of having a onInitIngredient function as a prop
//         wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>)
//     })

//     it('should render build controls when recieving ingredients' , () => {
//          wrapper.setProps({ ingred: { salad : 1}})
//          expect(BuildControls).toHaveLength(1)
//     })
// })