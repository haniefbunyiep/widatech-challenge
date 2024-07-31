import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export default function PaginationComponent(props) {
  return (
    <Pagination>
      <PaginationContent>
        <button onClick={props.prevItem} disabled={props.currentPage == 1}>
          <PaginationItem>
            <PaginationPrevious />
          </PaginationItem>
        </button>
        <PaginationItem>
          <PaginationLink isActive>
            {`${props.currentPage}/${props.totalPage}`}
          </PaginationLink>
        </PaginationItem>
        <button
          onClick={props.nextItem}
          disabled={props.currentPage == props.totalPage}
        >
          <PaginationItem>
            <PaginationNext />
          </PaginationItem>
        </button>
      </PaginationContent>
    </Pagination>
  );
}
