import React, { useState } from 'react';
import './Calendar.css';

const Calendar = ({ today, selectedDate, setSelectedDate }) => {
  // カレンダー現在位置を宣言
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  // 月を変更する関数
  const handleMonthChange = (increment) => {
    setCurrentMonth(prevMonth => {
      let newMonth = prevMonth + increment;
      let newYear = currentYear;

      if (newMonth < 0) {
        newMonth = 11;
        newYear -= 1;
      } else if (newMonth > 11) {
        newMonth = 0;
        newYear += 1;
      }

      setCurrentYear(newYear);
      return newMonth;
    });
  };

  // 月の日数を計算
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  // 月初の日の曜日を計算
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  // カレンダーの日付を格納する配列
  const dates = [];
  // 月初の日の曜日に対応するまでnullを追加
  for (let i = 0; i < firstDayOfMonth; i++) {
   
    dates.push(null);
  }
  // 月の日数分の日付を追加
  for (let i = 1; i <= daysInMonth; i++) {
    dates.push(i);
  }
  // 日付がクリックされた時の処理
  const handleDateClick = (date) => {
    setSelectedDate(`${currentYear}-${currentMonth + 1}-${date}`);
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button className="btn btn-primary" onClick={() => handleMonthChange(-1)}>&lt;</button>
        {currentYear}/{(currentMonth + 1 < 10) ? `0${currentMonth + 1}` : currentMonth + 1}
        <button className="btn btn-primary" onClick={() => handleMonthChange(1)}>&gt;</button>
      </div>
      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="calendar-day">{day}</div>
        ))}


      {dates.map((date, index) => (
        <div
          key={index}
          className={`calendar-date ${date ? 'active' : ''} ${selectedDate === `${currentYear}-${currentMonth + 1}-${date}` ? 'selected' : ''} ${index % 7 === 6 ? 'saturday' : ''} ${index % 7 === 0 ? 'sunday' : ''}`}
          onClick={() => date && handleDateClick(date)}
        >
          {date}
        </div>
      ))}
      </div>
    </div>
  );
};

export default Calendar;
