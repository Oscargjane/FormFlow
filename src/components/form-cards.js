import Link from 'next/link';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.js';
import { Badge } from '@/components/ui/badge.js';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.js';
import Icon from '@/components/ui/icon.js';
import RenameFormBtn from '@/components/rename-form-btn.js';
import DeleteFormBtn from '@/components/delete-form-btn.js';
import { formatDistance } from 'date-fns';
import { truncateTitle } from '@/lib/utils.js';

const FormCard = ({ form }) => {
  const { id, title, createdAt } = form;

  return (
    <Card className="flex max-w-[350px] h-full space-x-4 p-0 shadow-sm hover:shadow-neutral-300 transition duration-200 ease-in-out hover:!shadow-md">
      <Link
        href={`/editor/${id}/edit`}
        className="flex w-full h-full space-x-4"
        aria-label={`Edit form ${title}`}
      >
        <div className="w-12 h-full bg-neutral-50"></div>
        <CardHeader className="flex-1 min-w-max py-4 px-0">
          <CardTitle className="flex items-center gap-3">
            <span className="text-sm text-neutral-700 font-medium">
              {truncateTitle(title)}
            </span>
            <Badge className="bg-yellow-100 text-yellow-500 border-1 border-yellow-500 hover:bg-yellow-100">
              Draft
            </Badge>
          </CardTitle>
          <CardDescription className="flex items-center justify-between text-sm text-neutral-400">
            {formatDistance(createdAt, new Date(), {
              addSuffix: true,
            })}
          </CardDescription>
        </CardHeader>
      </Link>
      <CardFooter className="p-4">
        <Popover>
          <PopoverTrigger>
            <Icon name="EllipsisVertical" className="h-6 w-6 text-neutral-400" />
          </PopoverTrigger>
          <PopoverContent className="w-full flex flex-col gap-2 px-0 py-1 min-w-44">
            <RenameFormBtn formId={id} />
            <DeleteFormBtn formId={id} formTitle={title} />
          </PopoverContent>
        </Popover>
      </CardFooter>
    </Card>
  );
};

const FormCards = ({ forms }) => {
  return (
    <div className="grid grid-cols-3 gap-5">
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </div>
  );
};

export default FormCards;
