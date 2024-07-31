import React, { useEffect } from 'react';
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

export default function ProductInput({ formik, index }) {
  const [value, setValue] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const { data } = useGetProduct();

  const productData = data?.data?.data;

  useEffect(() => {
    if (value) {
      formik.setFieldValue('product_id', value);
    }
  }, [value]);

  // useEffect(() => {
  //   if (formik.values.selected_product[index].quantity) {
  //     formik.setFieldValue(`selected_product[${index}].product_id`, value);
  //   }
  // }, [formik.values.selected_product[index].quantity]);

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
              {productData?.map((product) => {
                return (
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
                );
              })}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <div>
        {/* <Input
          type='number'
          id={`selected_product.${index}.quantity`}
          name={`selected_product.${index}.quantity`}
          placeholder='Quantity'
          onChange={formik.handleChange}
          value={formik.values.selected_product[index].quantity}
        />
        <Label className='text-destructive'>
          {formik.touched.selected_product?.[index]?.quantity &&
            formik.errors.selected_product?.[index]?.quantity}
        </Label> */}
      </div>
    </div>
  );
}
