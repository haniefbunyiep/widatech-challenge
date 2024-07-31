import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Datepicker from 'react-tailwindcss-datepicker';
import { Card, CardHeader } from '@/components/ui/card';
import { useGetRevenue } from '@/helper/revenue/hooks/useGetRevenue';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const monthData = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

export default function SimpleLineChart() {
  const [month, setMonth] = useState('');
  const { mutationGetRevenue, isSuccess, data } = useGetRevenue();

  const startDate = new Date(Date.UTC(2024, 0, 1));
  const endDate = new Date(Date.UTC(2024, 11, 31, 23, 59, 59, 999));

  const [date, setDate] = useState({
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
  });

  const [revenue, setRevenue] = useState([]);

  // useEffect(() => {
  //   if (month) {
  //     setDate({ startDate: null, endDate: null });
  //   }
  // }, [month]);

  useEffect(() => {
    mutationGetRevenue({
      dateRange: date,
      month: month[1],
    });
  }, [date]);

  useEffect(() => {
    if (isSuccess && data?.data?.data) {
      setRevenue(data.data.data);
    }
  }, [isSuccess, data]);

  const dataKeys =
    revenue.length > 0
      ? Object.keys(revenue[0]).filter((key) => key !== 'date')
      : [];

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const colors = dataKeys.reduce((acc, key) => {
    acc[key] = getRandomColor();
    return acc;
  }, {});

  const handleSubmitMonth = () => {
    setDate({ startDate: null, endDate: null });
  };

  const handleValueChange = (newValue) => {
    setDate(newValue);
    setMonth('');
  };

  const handleReset = () => {
    setDate({
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
    });
    setMonth('');
  };

  return (
    <Card className='flex w-full flex-col items-center justify-between'>
      <CardHeader>Graph Revenue</CardHeader>
      <div className='flex w-full flex-col items-center justify-center gap-5'>
        <div className='flex w-[70%] justify-between gap-4'>
          <div className='w-fit'>
            <Datepicker value={date} onChange={handleValueChange} />
          </div>
          <div className='flex gap-4'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline'>
                  {!month ? 'Select Month' : month[0]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-56'>
                <DropdownMenuLabel>Filter By Month</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={month} onValueChange={setMonth}>
                  {monthData.map((item, index) => {
                    return (
                      <div key={index}>
                        <DropdownMenuRadioItem value={[item, index]}>
                          {item}
                        </DropdownMenuRadioItem>
                      </div>
                    );
                  })}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button onClick={handleSubmitMonth}>Submit</Button>
          </div>
          <div>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        </div>
        <ResponsiveContainer width='100%' height={400}>
          <LineChart
            data={revenue}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray='5 5' />
            <XAxis dataKey='date' />
            <YAxis />
            <Tooltip />
            <Legend />
            {dataKeys.map((key) => (
              <Line
                key={key}
                type='monotone'
                dataKey={key}
                stroke={colors[key]}
                activeDot={{ r: 8 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
