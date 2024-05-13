import { H3 } from '@/components/common/typography';
import { Button } from '@/components/ui/button';
import { ResourceEnum, Section } from '@/types/chapter/courses';
import { FolderOpen, Pencil, Plus, Trash2 } from 'lucide-react';
import { Resource } from './resource';
import { Separator } from '@/components/ui/separator';

type Props = {
	section: Section;
	pathname: string;
};
export function SectionComponent({ section, pathname }: Props) {
	return (
		<div className="bg-white p-4 rounded-lg">
			<div className="flex justify-between items-center">
				<H3 className="flex gap-2 text-base items-center">
					<FolderOpen width={16} height={16} className="text-text-GRAY" />
					Section :<span>{section.name}</span>
				</H3>
				<div className="flex gap-2 items-center">
					<Button variant="ghost">
						<Plus width={14} height={14} className="text-text-GRAY" />
					</Button>
					<Button variant="ghost">
						<Pencil width={14} height={14} className="text-black" />
					</Button>
					<Button variant="ghost">
						<Trash2 width={14} height={14} className="text-red-origin" />
					</Button>
				</div>
			</div>
			<div className="flex flex-col gap-4 p-4">
				{section.videos.map((v, i) => (
					<Resource
						key={i}
						currentPath={pathname}
						id={v.id}
						name={v.name}
						resourceType={ResourceEnum.Video}
						url={`${pathname}/video/${v.id}`}
					/>
				))}
				<Separator />
				{section.lectures.map((l, i) => (
					<Resource
						key={i}
						currentPath={pathname}
						id={l.id}
						name={l.content}
						url={`${pathname}/lecture/${l.id}`}
						resourceType={ResourceEnum.Lecture}
					/>
				))}
				<Separator />
				{section.files.map((f, i) => (
					<Resource
						key={i}
						currentPath={pathname}
						id={f.id}
						name={f.name}
						url={`${pathname}/file/${f.id}`}
						resourceType={ResourceEnum.File}
					/>
				))}
			</div>
		</div>
	);
}
