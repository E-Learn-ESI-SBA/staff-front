import { IQuiz } from '@/types/quiz';
import { DataTable } from '../common/table';
import { quiz } from '@/static/dummy-data/quiz/quiz';
import { CustomColumns } from '@/components/quiz/colloms';

export function QuizTable() {
	return (
		<>
			<DataTable<IQuiz>
				data={quiz}
				headers={[
					{
						accessorKey: 'id',
						title: 'ID',
					},
					{
						accessorKey: 'title',
						title: 'Quiz Title',
					},
					{
						accessorKey: 'category',
						title: 'Category',
					},
					{
						accessorKey: 'module_name',
						title: 'Module',
					},
					{
						accessorKey: 'publisher',
						title: 'Publisher',
					},
					{
						accessorKey: 'startDate',
						title: 'Start',
					},
					{
						accessorKey: 'endDate',
						title: 'End',
					},
					{
						accessorKey: 'questions',
						title: 'Questions',
					},
					{
						accessorKey: 'duration',
						title: 'Duration',
					},
				]}
				customColumns={[CustomColumns]}
				defaultFilter="title"
				fuzzyElements={['category', 'module_name', 'publisher']}
			/>
		</>
	);
}
