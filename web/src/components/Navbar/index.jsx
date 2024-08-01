import { Button } from '../ui/button';

export default function Navbar() {
  return (
    <header className='fixed left-0 right-0 top-0 z-10 border-b-2 border-secondary-foreground bg-white bg-opacity-90'>
      <div className='container mx-auto flex h-16 justify-between'>
        <a
          rel='noopener noreferrer'
          href='#'
          aria-label='Back to homepage'
          className='flex items-center p-2 text-2xl font-bold'
        >
          LOGO
        </a>
        <ul className='hidden items-stretch space-x-3 md:flex'>
          <li className='flex items-center justify-center'>
            <Button variant={'link'} className='text-lg'>
              Link
            </Button>
          </li>
          <li className='flex items-center justify-center'>
            <Button variant={'link'} className='text-lg'>
              Link
            </Button>
          </li>
          <li className='flex items-center justify-center'>
            <Button variant={'link'} className='text-lg'>
              Link
            </Button>
          </li>
          <li className='flex items-center justify-center'>
            <Button variant={'link'} className='text-lg'>
              Link
            </Button>
          </li>
        </ul>
        <button className='flex justify-end p-4 md:hidden'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            className='h-6 w-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4 6h16M4 12h16M4 18h16'
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
}
