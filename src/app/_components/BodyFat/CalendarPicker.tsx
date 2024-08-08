import React, { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarDays } from "lucide-react";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import ja from "date-fns/locale/ja";

registerLocale("ja", ja);
setDefaultLocale("ja");

interface CalendarPickerProps {
  onDayChange: (date: Date) => void;
  measurementDates?: Date[];
}

const CustomInput = forwardRef<
  HTMLButtonElement,
  { value?: string; onClick?: () => void }
>(({ onClick }, ref) => (
  <button onClick={onClick} ref={ref}>
    <CalendarDays className="h-5 w-5" />
  </button>
));

CustomInput.displayName = "CustomInput";

const CalendarPicker: React.FC<CalendarPickerProps> = ({
  onDayChange,
  measurementDates,
}) => {
  const [startDate, setStartDate] = useState(new Date());

  const handleChange = (date: Date | null) => {
    if (date) {
      setStartDate(date);
      onDayChange(date);
    }
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={handleChange}
      showTimeSelect={false}
      locale="ja"
      customInput={<CustomInput />}
      highlightDates={measurementDates}
    />
  );
};

export default CalendarPicker;
