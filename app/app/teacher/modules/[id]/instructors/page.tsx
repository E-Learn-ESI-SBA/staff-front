import InstructorsPage from '@/components/teacher/courses/instructors';
import { LinksTabs } from '@/components/teacher/courses/tabs';
import appRouter from '@/config/routes';
import { instructors } from '@/static/dummy-data/modules/instructors';

type Props = {
	id: string;
};
export default function ResourcePage({ id }: Props) {
	const path = appRouter.getPath('module')?.concat('/', id);
	const tabs = [
		{
			title: 'Overview',
			path: path,
		},
		{
			title: 'Resources',
			path: path.concat('/resources'),
		},
		{
			title: 'Instructors',
			path: path.concat('/instructors'),
		},
		{
			title: 'Discuss',
			path: path.concat('/discuss'),
		},
	];
	return (
		<main className="w-full min-h-screen bg-secondary-background  p-4">
			<LinksTabs activePath={path.concat('/instructors')} tabs={tabs} />
			<div className="w-full h-full flex flex-col gap-6 bg-white rounded-lg p-4">
				<InstructorsPage data={instructors} />
			</div>
		</main>
	);
}
