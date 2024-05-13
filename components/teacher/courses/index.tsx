'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChapterComponent } from './resources/chapter';
import { usePathname } from 'next/navigation';
import Overview from '@/components/dashboard/student/courses/overview';
import { Module } from '@/types/chapter/courses';

type Props = {
	data?: Module;
};
export default function TeacherCourse({ data }: Props) {
	const tabs = ['Overview', 'Resources', 'Instructors', 'Discuss'];
	const pathname = usePathname();
	return (
		<main className="w-full min-h-screen bg-secondary-background  p-4">
			<Tabs defaultValue={tabs[0]} className="w-full ">
				<TabsList className="grid grid-cols-4 p-4 relative  justify-center ">
					{tabs.map((t, i) => (
						<TabsTrigger
							value={t}
							className="text-text-GRAY data-[state=active]:border-b-4 data-[state=active]:border-blue-600 "
							key={i}>
							{' '}
							{t}Module
						</TabsTrigger>
					))}
				</TabsList>
				<div className="p-4 pt-12">
					<TabsContent value="Overview">
						<Overview description={data.description} points={data.plan} />
					</TabsContent>
					<TabsContent value="Resources">
						<div className="w-full h-full flex flex-col gap-6 bg-white rounded-lg p-4">
							{data.courses.map((c, i) => (
								<ChapterComponent chapter={c} key={i} pathname={pathname} />
							))}
						</div>
					</TabsContent>
				</div>
			</Tabs>
		</main>
	);
}
