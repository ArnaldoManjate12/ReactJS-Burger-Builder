import reducer from './auth'
import * as actionTypes from '../actions/actionTypes';
//import { configure , shallow } from 'enzyme'
//import Adapter from 'enzyme-adapter-react-16';

// connect enzynme to React
// configure({adapter: new Adapter()})


describe('Testing the initial setup of state in Auth reducer', () => {
    it('Should return Auth success', () => {
        expect(reducer( undefined , {})).toEqual({
                                                    error : null,
                                                    userId : '',
                                                    token : null,
                                                    loading : false,
                                                    redirectPath: '/'
                                                })
    })

    it('Should Successfully authenticate', () => {
        expect( reducer({
            error : null,
            userId : '',
            token : '',
            loading : false,
            redirectPath: '/'
        }, {
            type : actionTypes.AUTH_SUCCESS,
            userId :  'Some-UserId',
            idToken :'Some-Token'
        }) ).toEqual({
            error : null,
            userId : 'Some-UserId',
            token : 'Some-Token',
            loading : false,
            redirectPath: '/'
        })
    })
});

// describe('Testing the Auuth reucer', () => {
//     it('Should return Auth success', () => {
//         expect()
//     })
// });
