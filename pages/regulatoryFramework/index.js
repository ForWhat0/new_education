import client from "../../src/apollo/client";
import styled from "styled-components";
import { GET_PAGE } from "../../src/queries/pages/get-page";
import { useRouter } from "next/router";
import { MainLayout } from "../../src/components/layouts/mainLayout";
import { useState } from "react";
import {
  getDateIn_DD_MM_YYYY_Format,
  ParcMenu,
} from "../../src/components/hooks/hooks";
import { TitleForComponent } from "../../src/components/titleForComponent/title";
import { SearchBarStyled } from "../../src/components/searchBar/searchBar";
import { finance } from "../../src/Lsi/lsi";
import { useSelector } from "react-redux";
import { TreeSelect } from "../../src/components/tree-selector/tree-selector";
import { PdfComponent } from "../../src/components/pdfComponent/pdfComponent";

const Container = styled.div`
  width: 80%;
  margin-left: 10%;
  margin-bottom: 100px;
  background: 80% / 20% auto no-repeat fixed url(${(props) => props.bgImg});
  @media screen and (max-width: 700px) {
    background: unset;
    width: 93.6%;
    margin-left: 3.2%;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  @media screen and (max-width: 950px) {
    flex-direction: column;
  }
`;
const Input = styled.div`
  position: absolute;
  right: 0;
  @media screen and (max-width: 950px) {
    width: 100%;
    right: unset;
    position: relative;
    margin-bottom: 40px;
  }
`;

const LinkContainer = styled.a`
  display: flex;
  align-items: center;
  span {
    font-size: 24px;
    color: rgb(0, 114, 188, 1);
    border-bottom: 1px solid;
    @media screen and (max-width: 650px) {
      font-size: 16px;
    }
  }
`;
const TextContainer = styled.div`
  padding: 40px 0 20px 0;
  strong {
    font-size: 24px;
    font-weight: 400;
    @media screen and (max-width: 650px) {
      font-size: 16px;
    }
  }
`;

const IconLink = styled.div`
  width: 40px;
  height: 40px;
  padding-left: 10px;
  background: url(/linkIconDark.svg) no-repeat;
`;
const FinancialStatements = ({ menu, page, contacts, locale }) => {
  const router = useRouter();
  const { visuallyImpairedModeWhiteTheme } = useSelector((state) => state.app);
  const parsedMenu = ParcMenu(menu);
  const [searchInput, setSearchInput] = useState("");

  const TextPdf = ({ name, date }) => {
    return `${finance.report[locale]}
                                                ${name}
                                                (
                                                ${finance.date[locale]} 
                                                ${getDateIn_DD_MM_YYYY_Format(
                                                  date
                                                )}
                                                )`;
  };

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout contacts={contacts} menu={parsedMenu} hideLeftComponent={true}>
      <Container
        bgImg={
          !visuallyImpairedModeWhiteTheme
            ? "unset"
            : page?.financeField?.bgImg?.sourceUrl
        }
      >
        <TitleForComponent
          marginBottom="40px"
          borderBottom="unset"
          text={page.title}
        />

        <LinkContainer target="_blank" href={page.financeField?.link}>
          <IconLink />
          <span>{finance.law[locale]}</span>
        </LinkContainer>
        <TextContainer>
          <div dangerouslySetInnerHTML={{ __html: page.content }} />
          <PdfComponent
            mBottom="60px"
            href={page.financeField?.file?.mediaItemUrl}
            text={page.financeField?.fileText}
            size={page.financeField?.file?.fileSize}
            locale={locale}
          />
        </TextContainer>

        <Header>
          <TitleForComponent
            marginBottom="40px"
            borderBottom="unset"
            text={finance.title[locale]}
          />
          <Input>
            <SearchBarStyled
              value={searchInput}
              maxlength={10}
              width="100%"
              inputPlaceholder={finance.search[locale]}
              border="1px solid"
              inputFunc={(e) => setSearchInput(e.target.value)}
            />
          </Input>
        </Header>

        {searchInput.length > 0
          ? page?.financeField?.year?.map((el) =>
              el.filePdf
                ?.filter(
                  (file) => file.dateFile && file.dateFile.includes(searchInput)
                )
                .map((filteredFiles, index) => (
                  <PdfComponent
                    key={index + index}
                    mBottom="60px"
                    href={filteredFiles.downloadPdf.mediaItemUrl}
                    text={TextPdf({
                      name: filteredFiles.dateFile
                        ? filteredFiles.dateFile
                        : null,
                      date: filteredFiles.downloadPdf.dateGmt,
                    })}
                    size={filteredFiles.downloadPdf.fileSize}
                    locale={locale}
                  />
                ))
            )
          : page?.financeField?.year?.map((el, index) => (
              <div key={index}>
                <TreeSelect blueBorder={true} title={el.yearTitle}>
                  {el.filePdf?.map((file) => (
                    <PdfComponent
                      key={file.downloadPdf.mediaItemUrl}
                      mBottom="60px"
                      href={file.downloadPdf.mediaItemUrl}
                      text={TextPdf({
                        name: file.dateFile ? file.dateFile : null,
                        date: file.downloadPdf.dateGmt,
                      })}
                      size={file.downloadPdf.fileSize}
                      locale={locale}
                    />
                  ))}
                </TreeSelect>
              </div>
            ))}
      </Container>
    </MainLayout>
  );
};

export default FinancialStatements;

export const getStaticProps = async ({ locale }) => {
  const uri =
    locale === "EN"
      ? "/en/financial-statements/"
      : locale === "RU"
      ? "/ru/finansovaya-otchetnost-2/"
      : "/finansovaya-otchetnost/";
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
    query: GET_PAGE,
    variables: {
      uri,
      location,
      contactsUri,
    },
  });

  return {
    props: {
      locale,
      contacts: data?.contacts?.contactsFields
        ? data.contacts.contactsFields
        : [],
      menu: data?.menuItems?.nodes || [],
      page: data?.page ? data.page : [],
    },
    revalidate: 1,
  };
};
