import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { EFileType } from '@/types/courses';
import { ClassValue } from 'clsx';
import {
	Download,
	FileBarChart2,
	FileCode,
	FileText,
	Image as ImageIcon,
} from 'lucide-react';
import { PropsWithChildren } from 'react';
import { H2, H4 } from '@/components/common/typography';

type FileBoxProps = PropsWithChildren & {
	fileType: EFileType;
	url: string;
};
function FileBox({ children, fileType }) {
	return (
		<Button
			className={`p-4 ${fileType === EFileType.IMAGE ? 'bg-green-light' : fileType === EFileType.DOCUMENT ? 'bg-blue-light' : fileType === EFileType.PDF ? 'bg-red-light' : 'bg-purple-light'}`}>
			{children}
		</Button>
	);
}

type BoxProps = {
	url: string;
	fileType: EFileType;
	size: string;
	name: string;
};
function Box({ fileType, name, size, url }: BoxProps) {
	const FileIcon = ({ className }: { className: ClassValue }) => {
		return fileType === EFileType.IMAGE ? (
			<ImageIcon className={cn('text-green-origin', className)} />
		) : fileType === EFileType.DOCUMENT ? (
			<FileBarChart2 className={cn('text-blue-origin', className)} />
		) : fileType === EFileType.PDF ? (
			<FileText className={cn('text-red-origin', className)} />
		) : (
			<FileCode className={cn('text-purple-origin', className)} />
		);
	};
	return (
		<li className="flex gap-2 items-center">
			<FileBox fileType={fileType}>
				<FileIcon className="w-7 h-7" />
			</FileBox>
			<span className="flex flex-col justify-between gap-2 flex-1">
				<H4 className="text-base font-bold">{name}</H4>
				<span className="text-sm">
					{fileType} {size}
				</span>
			</span>
			<a href={url} download>
				<Button className="p-2 relative w-fit h-fit">
					<Download className="w-5 h-5 text-purple-origin" />
				</Button>
			</a>
		</li>
	);
}

type Props = {
	files: BoxProps[];
};
export function fileAside({ files }: Props) {
	return (
		<aside className="max-w-80 min-w-52">
			<H2 className="text-base">
				Files: <span className="p-1 bg-light-medium">{files.length}</span>
			</H2>
			<ul className="flex gap-2">
				{files.map((file, index) => (
					<Box key={index} {...file} />
				))}
			</ul>
		</aside>
	);
}
