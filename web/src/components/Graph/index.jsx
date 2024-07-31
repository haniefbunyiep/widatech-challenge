import React, { useEffect } from 'react';
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
import { useState } from 'react';
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

const dummyData = [
  { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
];

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
  const [month, setMonth] = React.useState('');

  const { mutationGetRevenue, isSuccess, data } = useGetRevenue();

  // console.log(data?.data?.data);

  const startDate = new Date(Date.UTC(2024, 0, 1));
  const endDate = new Date(Date.UTC(2024, 11, 31, 23, 59, 59, 999));

  const [date, setDate] = useState({
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
  });

  const [revenue, setRevenue] = useState([]);

  // console.log(revenue);
  // console.log(!month);

  const handleValueChange = (newValue) => {
    console.log('newValue:', newValue);
    setDate(newValue);
    setMonth('');
  };

  useEffect(() => {
    mutationGetRevenue({
      dateRange: date,
    });
  }, [date]);

  useEffect(() => {
    if (isSuccess) {
      setRevenue(data?.data?.data);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (month) {
      setDate({ startDate: null, endDate: null });
    }
  }, [month]);

  return (
    <Card className='flex w-full flex-col items-center justify-between'>
      <CardHeader>Graph Revenue</CardHeader>
      <div className='flex w-full flex-col items-center justify-center gap-5'>
        <div className='flex w-fit gap-4'>
          <Datepicker value={date} onChange={handleValueChange} />
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
        </div>
        <ResponsiveContainer width='100%' height={400}>
          <LineChart
            data={revenue}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type='monotone'
              dataKey='Book'
              stroke='#8884d8'
              activeDot={{ r: 8 }}
            />
            <Line type='monotone' dataKey='Pencil' stroke='#82ca9d' />
            <Line type='monotone' dataKey='Eraser' stroke='black' />
            <Line type='monotone' dataKey='Hat' stroke='red' />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
