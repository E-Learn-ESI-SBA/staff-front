import { Button } from '@/components/ui/button';
import { ChapterWithSections, type Chapter } from '@/types/courses';
import { Folders, Pencil, Plus, Trash2 } from 'lucide-react';
import { SectionComponent } from './section';

type Props = {
	chapter: ChapterWithSections;
	pathname: string;
};
export function Chapter({ chapter, pathname }: Props) {
	return (
		<div className="bg-secondary-background p-4 flex flex-col gap-4 rounded-lg">
			<div className="flex justify-between items-center">
				<div className="flex gap-2 text-lg items-center">
					<Folders width={24} height={24} className="text-text-GRAY" />
					<span>Chapter {chapter.chapter_number}:</span>
					<span>{chapter.name}</span>
				</div>
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
			{chapter.sections.map((s, i) => (
				<SectionComponent key={i} section={s} pathname={pathname} />
			))}
		</div>
	);
}
