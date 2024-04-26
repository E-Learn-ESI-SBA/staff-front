import TeacherCourse from '@/components/teacher/courses';
import { moduleData } from '@/static/dummy-data/modules/chapter';

export default function CoursePage() {
	return <TeacherCourse data={moduleData} />;
}
