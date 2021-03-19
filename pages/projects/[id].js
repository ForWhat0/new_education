import { useSelector } from "react-redux";
import styled, { css, keyframes } from "styled-components";
import StyledLoader from "../../src/components/loader/loader";
import { TitleForComponent } from "../../src/components/titleForComponent/title";
import PostBody from "../../src/components/post-body/post-body";
import { MainLayout } from "../../src/components/layouts/mainLayout";
import GET_ALL_SLUG_FROM_PROJECTS from "../../src/queries/get-all-slug-from-projects";
import GET_PROJECT_BY_SLUG from "../../src/queries/get-project-by-slug";
import { ParcMenu } from "../../src/components/hooks/hooks";
import client from "../../src/apollo/client";
import { SwiperComponent } from "../../src/components/swiper/swiper";

const breath = keyframes`
0% {
    -webkit-transform: scale(0.9);
    -ms-transform: scale(0.9);
    transform: scale(0.9);
  }

  25% {
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
  }

  60% {
    -webkit-transform: scale(0.9);
    -ms-transform: scale(0.9);
    transform: scale(0.9);
  }

  100% {
    -webkit-transform: scale(0.9);
    -ms-transform: scale(0.9);
    transform: scale(0.9);
  }
`;

const BreathingAnimation = () =>
  css`
    ${breath} 5s ease-out infinite normal;
  `;

const Container = styled.div`
  width: 100%;
  background: url(${(props) => props.bgImg}) no-repeat center center fixed;
  @media screen and (max-width: 700px) {
    background: unset;
  }
`;
const ContainerWrapper = styled.div`
  position: relative;
  width: 80%;
  margin-top: 40px;
  margin-left: 10%;
  @media screen and (max-width: 700px) {
    width: 93.6%;
    margin-left: 3.2%;
  }
  h1 {
    @media screen and (max-width: 700px) {
      font-size: 25px;
    }
  }

  a {
    display: flex;
    align-items: center;
  }

  span {
    margin-left: 10px;
    margin-right: 10px;
    color: blue;
    border-bottom: 1px solid rgb(0, 114, 188);
  }
`;
const LoaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 70px;
  margin-bottom: 70px;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 40px;
  margin-bottom: 40px;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.borderColor};
  @media screen and (max-width: 1200px) {
    flex-direction: column;
  }
  @media screen and (max-width: 700px) {
    padding-bottom: 20px;
  }
`;
const Icons = styled.div`
  width: 100%;
  justify-content: flex-end;
  display: flex;
  align-items: center;
  @media screen and (max-width: 700px) {
    flex-direction: column;
    justify-content: unset;
    align-items: unset;
  }
`;
const IconItem = styled.div`
  margin-left: ${(props) => props.marginR};
  animation: ${(props) => props.animation};
  @media screen and (max-width: 700px) {
    margin-left: unset;
    margin-bottom: 10px;
  }
`;
export default function ProjectDetails({ projectBySlug, menu, contacts }) {
  const parsedMenu = ParcMenu(menu);
  const { visuallyImpairedMode } = useSelector((state) => state.app);
  const { visuallyImpairedModeWhiteTheme } = useSelector((state) => state.app);
  return (
    <MainLayout
      databaseId={projectBySlug.databaseId}
      contacts={contacts}
      menu={parsedMenu}
      routerLinkTitle={projectBySlug.title}
    >
      {projectBySlug ? (
        <Container
          bgImg={
            !visuallyImpairedMode &&
            projectBySlug.projectFields?.bgImg?.sourceUrl &&
            projectBySlug.projectFields.bgImg.sourceUrl
          }
        >
          <ContainerWrapper>
            <Header
              borderColor={visuallyImpairedModeWhiteTheme ? "#1D1D1B" : "white"}
            >
              <TitleForComponent
                displayYellowDiv={false}
                text={projectBySlug.title}
                fontSize="40px"
              />
              <Icons>
                {projectBySlug.projectFields.playLink && (
                  <IconItem marginR="20px">
                    <a
                      target="_blank"
                      href={projectBySlug.projectFields.playLink}
                    >
                      <div
                        style={{
                          width: "130px",
                          height: "40px",
                          background: "url(/googlePlayIcon.svg) no-repeat",
                        }}
                      />
                    </a>
                  </IconItem>
                )}
                {projectBySlug.projectFields.appLink && (
                  <IconItem marginR="20px">
                    <a
                      target="_blank"
                      href={projectBySlug.projectFields.appLink}
                    >
                      <div
                        style={{
                          width: "130px",
                          height: "40px",
                          background: "url(/appStore.svg) no-repeat",
                        }}
                      />
                    </a>
                  </IconItem>
                )}
                {projectBySlug.projectFields.siteLink && (
                  <IconItem animation={BreathingAnimation} marginR="60px">
                    <a
                      target="_blank"
                      href={projectBySlug.projectFields.siteLink}
                    >
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          background: "url(/linkIconDark.svg) no-repeat",
                        }}
                      />
                      <div>
                        <span style={{ color: "rgb(0,114,188)" }}>
                          {projectBySlug.projectFields.siteLink.substring(
                            0,
                            20
                          )}
                          ...
                        </span>
                      </div>
                    </a>
                  </IconItem>
                )}
              </Icons>
            </Header>

            <PostBody content={projectBySlug.content} />
            {projectBySlug.projectFields.gallarySlider && (
              <SwiperComponent
                gallery={projectBySlug.projectFields.gallarySlider}
              />
            )}
          </ContainerWrapper>
        </Container>
      ) : (
        <LoaderContainer>
          <StyledLoader />
        </LoaderContainer>
      )}
    </MainLayout>
  );
}

export const getStaticProps = async ({ params, locale }) => {
  const id = params?.id;
  const contactsUri =
    locale === "EN"
      ? "/en/contacts/"
      : locale === "RU"
      ? "/ru/kontakty/"
      : "/kontakti/";
  const location =
    locale === "EN"
      ? "HEADER_MENU___EN"
      : locale === "RU"
      ? "HEADER_MENU___RU"
      : "HEADER_MENU";

  const { data } = await client.query({
    query: GET_PROJECT_BY_SLUG,
    variables: {
      id,
      location,
      contactsUri,
    },
  });
  return {
    props: {
      projectBySlug: data?.project ? data.project : [],
      menu: data?.menuItems?.nodes || [],
      contacts: data?.contacts?.contactsFields
        ? data.contacts.contactsFields
        : [],
    },
    revalidate: 1,
  };
};

export const getStaticPaths = async ({ locales }) => {
  let paths = [];

  const { data } = await client.query({
    query: GET_ALL_SLUG_FROM_PROJECTS,
  });

  for (const locale of locales) {
    paths = [
      ...paths,
      ...data.projects?.nodes.map((el) => ({
        params: { id: el.databaseId.toString() },
        locale,
      })),
    ];
  }

  return {
    fallback: "blocking",
    paths,
  };
};
