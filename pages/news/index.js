import client from "../../src/apollo/client";
import { MainLayout } from "../../src/components/layouts/mainLayout";
import GET_NEWS from "../../src/queries/getNews";
import NewsWrapper from "../../src/components/news/newsWrapper";
import styled from "styled-components";
import {
  ParcMenu,
  startEndPagination,
  useOnClickOutside,
} from "../../src/components/hooks/hooks";
import { Pagination } from "../../src/components/pagination/pagination";
import { useEffect, useRef, useState } from "react";
import { TitleForComponent } from "../../src/components/titleForComponent/title";
import Calendar from "react-calendar";
import { device } from "../../src/components/deviceSizes/deviceSizes";
import GET_NEWS_BY_DATE from "../../src/queries/get_news_by_date";
import StyledLoader from "../../src/components/loader/loader";
import { NewsLsi } from "../../src/Lsi/lsi";
import {
  CalendarContainer,
  CalendarIcon,
  CalendarWrapper,
  LoaderContainer,
} from "../calendar";
import { useSelector } from "react-redux";

export const Container = styled.div`
  width: 80%;
  margin-left: 10%;
  @media screen and ${device.tablet} {
    width: 93.6%;
    margin-left: 3.2%;
  }
`;
const NewsContainer = styled.div`
  width: 100%;
  @media screen and ${device.tablet} {
    width: 80%;
    margin-left: 10%;
  }
`;

const Title = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
`;

const ShowAll = styled.span`
  color: rgb(0, 114, 188);
  cursor: pointer;
  position: absolute;
  right: 80px;
  @media screen and ${device.tablet} {
    height: 30px;
    right: 40px;
  }
`;
export default function AllNews({
  news,
  menu,
  currentPageNumber,
  contacts,
  locale,
}) {
  const [searchLoading, setSearchLoading] = useState(false);
  const { visuallyImpairedModeWhiteTheme } = useSelector((state) => state.app);
  const { total, hasMore, hasPrevious } = news.pageInfo.offsetPagination;
  const totalPages = Math.ceil(total / 9.0);
  const [newsByDate, setNewsByTitle] = useState([]);
  const { startPage, endPage } = startEndPagination(
    currentPageNumber,
    totalPages
  );
  const parsedMenu = ParcMenu(menu);
  const [value, onChange] = useState(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const calendar = useRef();
  useOnClickOutside(
    calendar,
    () => calendarOpen && setCalendarOpen(!calendarOpen)
  );
  const selectedDay = (value) => {
    setCalendarOpen(false);
    onChange(value);
  };
  const Search = async () => {
    setSearchLoading(true);
    const date = new Date(value);
    const { data } = await client.query({
      query: GET_NEWS_BY_DATE,
      variables: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        language: locale,
      },
    });
    setSearchLoading(false);
    setNewsByTitle(data.news);
  };

  useEffect(() => {
    if (value) {
      Search();
    }
  }, [value]);

  return (
    <MainLayout databaseId={1} contacts={contacts} menu={parsedMenu}>
      <Container>
        <Title>
          <TitleForComponent text={NewsLsi.news[locale]} />
          <ShowAll onClick={() => onChange(null)}>
            {NewsLsi.showAll[locale]}
          </ShowAll>
          <CalendarWrapper ref={calendar}>
            <CalendarIcon onClick={() => setCalendarOpen(!calendarOpen)} />
            <CalendarContainer open={calendarOpen ? "block" : "none"}>
              <Calendar
                locale={
                  locale === "EN"
                    ? "en-EN"
                    : locale === "RU"
                    ? "ru-RU"
                    : "ua-UA"
                }
                className={
                  !visuallyImpairedModeWhiteTheme
                    ? "calendarVisuallyMode"
                    : "calendar"
                }
                onChange={(value) => selectedDay(value)}
                value={value || new Date()}
              />
            </CalendarContainer>
          </CalendarWrapper>
        </Title>

        {value ? (
          searchLoading ? (
            <LoaderContainer>
              <StyledLoader />
            </LoaderContainer>
          ) : newsByDate?.nodes?.length > 0 ? (
            <>
              <LoaderContainer>
                <h2>{NewsLsi.result[locale]}</h2>
              </LoaderContainer>
              <NewsContainer>
                <NewsWrapper posts={news.nodes} />
              </NewsContainer>
            </>
          ) : (
            <LoaderContainer>
              <h2>{NewsLsi.notExist[locale]}</h2>
            </LoaderContainer>
          )
        ) : (
          <>
            {news.nodes.length > 0 && (
              <NewsContainer>
                <NewsWrapper posts={news.nodes} />
              </NewsContainer>
            )}
            <Pagination
              locale={locale}
              currentPageNumber={currentPageNumber}
              hasMore={hasMore}
              hasPrevious={hasPrevious}
              startPage={startPage}
              endPage={endPage}
              href="news"
            />
          </>
        )}
      </Container>
    </MainLayout>
  );
}

export async function getStaticProps({ params, locale }) {
  const currentPage = params?.currentPage;
  const currentPageNumber = +(currentPage || 0);
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
  const offset = currentPageNumber === 0 ? 0 : (currentPageNumber - 1) * 9;

  const { data } = await client.query({
    query: GET_NEWS,
    variables: {
      size: 9,
      offset: offset,
      language: locale,
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
      currentPageNumber,
      menu: data?.menuItems?.nodes || [],
      news: data?.news?.nodes ? data.news : [],
    },
    revalidate: 1,
  };
}
