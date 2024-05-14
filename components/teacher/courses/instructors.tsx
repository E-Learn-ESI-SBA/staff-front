import { Instructor } from '@/components/common/instructor';
import { H2 } from '@/components/common/typography';
import { TInstructor } from '@/types/staff';

type Props = {
	data: TInstructor[];
};
export default function InstructorsPage({ data }: Props) {
	return (
		<div className="flex gap-4 p-4">
			<H2 className="text-2xl">Instructors ({data.length}) </H2>
			{data.map((instructor, index) => (
				<Instructor key={index} {...instructor} />
			))}
		</div>
	);
}
