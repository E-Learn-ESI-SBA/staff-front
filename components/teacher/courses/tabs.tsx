import { cn } from '@/lib/utils';
import { Link } from 'lucide-react';

type Props = {
	tabs: {
		title: string;
		path: string;
	}[];
	activePath: string;
};
export const LinksTabs = ({ tabs, activePath }: Props) => {
	return (
		<div className="w-full grid grid-cols-4 relative ">
			{tabs.map((tab, index) => (
				<Link
					key={index}
					href={tab.path}
					className={cn(
						'text-text-GRAY',
						tab.path === activePath ? 'border-b-4 border-blue-600' : ''
					)}>
					{tab.title}
				</Link>
			))}
		</div>
	);
};
