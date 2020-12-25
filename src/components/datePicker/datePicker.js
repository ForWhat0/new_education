import React, {useEffect, useState} from "react";
import {
    addDays,
    addMonths,
    format,
    isSameDay,
    lastDayOfMonth,
    startOfMonth
} from "date-fns";
import { uk } from 'date-fns/locale'
import {
    DateDayItem,
    DateLabel, DateListScrollable,
    DayLabel,
    DaysContainer,
    MonthContainer,
    MonthYearLabel,
    Container, ButtonWrapper
} from "./styledDatePicker";
import {maxDay, minDay} from "../hooks/hooks";

export default function DatePicker({ selectDate, getSelectedDay, labelFormat,tileDisabled}) {

    const [selectedDate, setSelectedDate] = useState(new Date());


    const startDate = minDay(selectDate,30)
    const lastDate = maxDay(selectDate,30)

    const selectedStyle = {
        background:' rgba(0, 114, 188, 0.2)',
        opacity: 1,
        borderRadius:' 20px'
    }

    const eventDayStyle = {
        background: '#FFFFFF',
        opacity: 1,
        borderRadius:' 20px'
    }

    const getStyles = (day) => {

        if (isSameDay(day, selectedDate)) {
            return (selectedStyle);
        }
        else if (
            tileDisabled.some(dayEvent=>
                (isSameDay(day, new Date(dayEvent.dateGmt)))
            )
        ) {
            return (eventDayStyle);
        }
        return null
    };

    const getId = (day) => {
        if (isSameDay(day, selectedDate)) {
            return ('selected')
        } else {
            return ("")
        }
    };

    function renderDays() {
        const dayFormat = "EEEE";
        const dateFormat = "d";
        const months = [];
        let days = [];
        for (let i = 0; i <= 2; i++) {
            let start, end;
            const month = startOfMonth(addMonths(startDate, i));
            start = i === 0 ? Number(format(startDate, dateFormat)) - 1 : 0;
            end = i === 2 ? Number(format(lastDate, "d")) : Number(format(lastDayOfMonth(month), "d"));
            for (let j = start; j < end; j++) {
                const style = getStyles(addDays(month, j))
                days.push(
                    <DateDayItem id={`${getId(addDays(month, j))}`}

                         style={style}
                         key={addDays(month, j)}
                         onClick={() => style && onDateClick(addDays(month, j))}

                    >
                        <DayLabel>
                            {format(addDays(month, j), dayFormat, {locale: uk})}
                        </DayLabel>
                        <DateLabel >
                            {format(addDays(month, j), dateFormat)}
                        </DateLabel>
                    </DateDayItem>
                );
            }
            months.push(
                <MonthContainer  key={month}>
                    <MonthYearLabel>
                        {format(month,  "LLLL yyyy",{locale: uk})}
                    </MonthYearLabel>
                    <DaysContainer>
                        {days}
                    </DaysContainer>
                </MonthContainer>
            );
            days = [];
        }
        return <DateListScrollable id={"container"} >{months}</DateListScrollable>;
    }

    const onDateClick = day => {
        setSelectedDate(day);
        if (getSelectedDay) {
            getSelectedDay(day);
        }
    };



    useEffect(() => {
                setSelectedDate(selectDate);
                setTimeout(() => {
                    let view = document.getElementById('selected');
                    if (view) {
                        view.scrollIntoView({behavior: "smooth", inline: "center", block: "nearest"});
                    }
                }, 20);


    }, [selectDate]);

    const nextWeek = () => {
        const e = document.getElementById('container');
        const width = e ? e.getBoundingClientRect().width : null;
        e.scrollLeft += width;
    };

    const prevWeek = () => {
        const e = document.getElementById('container');
        const width = e ? e.getBoundingClientRect().width : null;
        e.scrollLeft -= width;
    };

    return (
        <Container >
            <ButtonWrapper onClick={prevWeek} margin='22px 22px 0 0' arrow='/leftArrow.svg'/>
            {renderDays()}
            <ButtonWrapper onClick={nextWeek} margin='22px 0 0 22px' arrow='/rightArrow.svg'/>
        </Container>
    )
}