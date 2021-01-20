import {
    HeaderWrapper,
    WrapperInner,
    Main,
    NavBar,
    Footer,
    NavBarVisuallyImpaired, LogoImg, LargeHeaderDesktop, LargeHeaderMobile
} from './headerStyledElements'
import {headerLsi} from '../../Lsi/lsi'
import { useSelector} from "react-redux"
import {useRouter} from "next/router";
import Link from "next/link";
import MainHeader from "./mainHeader";
import {Title} from "../leftComment/leftCommentStyLedComponents";
const {register,logIn,subtitle,inputPlaceholder} = headerLsi

export default function LargeHeader({menu,contacts,title}) {
    const router = useRouter()
    const locale = router.locale
    const {visuallyImpairedMode} = useSelector(state=>state.app)
    return (
        <>
            <LargeHeaderDesktop>
                <HeaderWrapper background={visuallyImpairedMode ? 'none' : 'url(/diia_gradient.png)'}>
                    <WrapperInner>
                        <NavBarVisuallyImpaired display={visuallyImpairedMode ? 'flex' : 'none'} locale={locale}/>
                        <NavBar
                            navButtons={menu}
                            register={register[locale]}
                            logIn={logIn[locale]}
                        />
                        <Main
                            logo1='/headerLogo.svg'
                            logo2='/headerSecondLogo.svg'
                            title={title}
                            subtitle={subtitle[locale]}
                        />
                        <Footer
                            display={visuallyImpairedMode ? 'none' : 'block'}
                            minWidth={visuallyImpairedMode ? 'unset' : '220px'}
                            contacts={contacts}
                            inputName='search'
                            inputFunc={()=>{return null}}
                            inputPlaceholder={inputPlaceholder[locale]}
                        />
                    </WrapperInner>
                </HeaderWrapper>
            </LargeHeaderDesktop>
            <LargeHeaderMobile>
                <MainHeader menu={menu}/>
                <Main
                    logo1='/headerLogo.svg'
                    logo2='/headerSecondLogo.svg'
                    title={title}
                    subtitle={subtitle[locale]}
                />
            </LargeHeaderMobile>
        </>
    )
}
