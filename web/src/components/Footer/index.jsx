import { FaSquareUpwork } from 'react-icons/fa6';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { Button } from '../ui/button';

export default function Footer() {
  return (
    <footer className='border-t-2 border-secondary-foreground px-4 py-8'>
      <div className='container mx-auto flex flex-wrap items-center justify-center space-y-4 sm:justify-between sm:space-y-0'>
        <div className='flex flex-row space-x-4 pr-3 sm:space-x-8'>
          <div className='flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full dark:bg-violet-600'>
            <FaSquareUpwork size={40} />
          </div>
          <ul className='flex flex-wrap items-center space-x-4 sm:space-x-8'>
            <li>
              <Button
                className='text-md flex items-center justify-center gap-2'
                variant='link'
              >
                Terms of Use
              </Button>
            </li>
            <li>
              <Button
                className='text-md flex items-center justify-center gap-2'
                variant='link'
              >
                Privacy
              </Button>
            </li>
          </ul>
        </div>
        <ul className='flex flex-wrap space-x-4 pl-3 sm:space-x-8'>
          <li>
            <Button
              className='flex items-center justify-center gap-2'
              variant='link'
            >
              <FaInstagram size={25} />
              Instagram
            </Button>
          </li>
          <li>
            <Button
              className='flex items-center justify-center gap-2'
              variant='link'
            >
              <FaLinkedin size={25} />
              LinkedIn
            </Button>
          </li>
          <li>
            <Button
              className='flex items-center justify-center gap-2'
              variant='link'
            >
              <FaGithub size={25} />
              GitHub
            </Button>
          </li>
        </ul>
      </div>
    </footer>
  );
}
