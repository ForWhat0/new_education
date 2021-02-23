import { useRouter } from "next/router";
import { linkTitleLsi } from "../../Lsi/lsi";
import styled from "styled-components";
import Link from "next/link";
import { device } from "../deviceSizes/deviceSizes";

const Global = styled.div`
  margin: 40px 0 40px 10%;
  @media screen and ${device.tablet} {
    margin: 40px 0 40px 3.2%;
  }
`;
const Home = styled.span`
  color: #bdbdbd;
  cursor: pointer;
`;
const CurrentLink = styled.span``;
const NextIcon = styled.i`
  margin: 0 20px 0 20px;
`;

export const RouterLink = ({ routerLinkTitle }) => {
  const router = useRouter();
  const locale = router.locale;
  const pathname = router.pathname;
  const currentLink = pathname.substring(1).split("/").shift();
  const currentLinkTitle = linkTitleLsi[currentLink][locale];

  return (
    <Global>
      <Link href="/">
        <a>
          <Home>
            {linkTitleLsi.home[locale]}
            <NextIcon className="fa fa-play" aria-hidden="true" />
          </Home>
        </a>
      </Link>

      {routerLinkTitle && (
        <Link href={`/${currentLink}`}>
          <a>
            <Home>
              {currentLinkTitle}
              <NextIcon className="fa fa-play" aria-hidden="true" />
            </Home>
          </a>
        </Link>
      )}

      <CurrentLink>
        {routerLinkTitle
          ? `${routerLinkTitle.substring(0, 27)}...`
          : currentLinkTitle}
      </CurrentLink>
    </Global>
  );
};
