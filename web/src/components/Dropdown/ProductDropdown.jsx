// ProductInput.jsx
import React, { useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGetProduct } from '@/helper/product/hooks/useGetProduct';

export default function ProductInput({ formik, reset }) {
  const [value, setValue] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const { data } = useGetProduct();
  const productData = data?.data?.data;

  useEffect(() => {
    if (reset) {
      setValue('');
    }
  }, [reset]);

  useEffect(() => {
    if (value) {
      formik.setFieldValue('product_id', value);
    }
  }, [value]);

  console.log(reset);

  console.log(value);

  return (
    <div className='flex items-center gap-2'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className='w-[200px] justify-between'
          >
            {value
              ? productData.find((product) => product.id === value)
                  ?.product_name
              : 'Select product...'}
            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[200px] p-0'>
          <Command>
            <CommandInput placeholder='Search product...' />
            <CommandEmpty>No product found.</CommandEmpty>
            <CommandGroup>
              {productData?.map((product) => (
                <CommandList key={product.id}>
                  <CommandItem
                    value={product.id}
                    onSelect={() => {
                      setValue(product.id);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value === product.id ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                    {product.product_name}
                  </CommandItem>
                </CommandList>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
