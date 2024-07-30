'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';

const payment = [
  {
    value: 'CASH',
    label: 'Cash',
  },
  {
    value: 'CREDIT',
    label: 'Credit',
  },
  {
    value: 'NOTCASHORCREADIT',
    label: 'Other',
  },
];

export default function PaymentInput(props) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='justify-between'
        >
          {props.formik.values.payment_method
            ? payment.find(
                (payment) =>
                  payment.value === props.formik.values.payment_method,
              )?.label
            : 'Select payment...'}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='p-0'>
        <Command>
          <CommandInput placeholder='Search payment...' />
          <CommandEmpty>No payment found.</CommandEmpty>
          <CommandGroup>
            {payment.map((payment) => (
              <CommandList key={payment.value}>
                <CommandItem
                  value={payment.value}
                  onSelect={(currentValue) => {
                    props.formik.setFieldValue(
                      'payment_method',
                      currentValue === props.formik.values.payment_method
                        ? ''
                        : currentValue,
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      props.formik.values.payment_method === payment.value
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                  {payment.label}
                </CommandItem>
              </CommandList>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
