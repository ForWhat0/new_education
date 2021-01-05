import {
    hideLoader,
    showLoader,
    showAlert,
    hideAlert,
    changeLanguage,
    showExtraLoader,
    hideExtraLoader,
    clickBurger,
    clickModal,
    clickVisuallyImpairedMode,
    clickOnOffImages,
    clickVisuallyImpairedModeOn,
    clickVisuallyImpairedModeOff,
    clickOnOffVisuallyImpairedModeWhiteTheme, changeFontSizeNormal
} from '../types/types'

const initialState = {
    loading:false,
    extraLoading:false,
    alert:null,
    title:'HOME',
    type:'success',
    language:'ukr',
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
                modal: !state.modal
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
        case changeLanguage:{
            return {
                ...state,
                language: action.payload.language
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
        case showExtraLoader:{
            return {
                ...state,
                extraLoading: true
            }
        }
        case hideExtraLoader:{
            return {
                ...state,
                extraLoading: false
            }
        }
        case showAlert:{
            return {
                ...state,
                type:action.payload.type,
                alert: action.payload.text
            }
        }
        case hideAlert:{
            return {
                ...state,
                alert: null
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