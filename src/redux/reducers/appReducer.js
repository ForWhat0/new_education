import {
    hideLoader,
    showLoader,
    clickBurger,
    clickModal,
    clickOnOffImages,
    clickVisuallyImpairedModeOn,
    clickVisuallyImpairedModeOff,
    clickOnOffVisuallyImpairedModeWhiteTheme, changeFontSizeNormal
} from '../types/types'

const initialState = {

    loading:false,
    title:'HOME',
    menuBurgerIsOpen:false,
    modal:false,
    visuallyImpairedMode:false,
    fontSize:'normal',
    images:true,
    visuallyImpairedModeWhiteTheme:true,

}

export const appReducer = ( state = initialState,action ) =>{
    switch (action.type){
        case clickModal:{
            return {
                ...state,
                modal: action.payload
            }
        }
        case changeFontSizeNormal:{
            return {
                ...state,
                fontSize: action.payload
            }
        }
        case clickOnOffVisuallyImpairedModeWhiteTheme:{
            return {
                ...state,
                visuallyImpairedModeWhiteTheme: action.payload
            }
        }
        case clickVisuallyImpairedModeOn:{
            return {
                ...state,
                visuallyImpairedMode: true,
                images: false
            }
        }
        case clickVisuallyImpairedModeOff:{
            return {
                ...state,
                visuallyImpairedMode: false,
                images: true,
                visuallyImpairedModeWhiteTheme:true,
                fontSize: 'normal'
            }
        }
        case clickOnOffImages:{
            return {
                ...state,
                images: !state.images
            }
        }

        case showLoader:{
            return {
                ...state,
                loading: true
            }
        }
        case hideLoader:{
            return {
                ...state,
                loading: false
            }
        }
        case clickBurger:{
            return {
                ...state,
                menuBurgerIsOpen: !state.menuBurgerIsOpen
            }
        }
        default:return state
    }
}