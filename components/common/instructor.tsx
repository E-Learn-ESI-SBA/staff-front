import { TInstructor } from '@/types/staff';
import Image from 'next/image';

type Props = TInstructor;

export const Instructor = ({ about, image, name, title }: Props) => {
	return (
		<div className="flex gap-4 p-4 items-center">
			<Image
				src={image}
				width={140}
				height={140}
				alt={name}
				className="rounded-full"
			/>
			<div className="flex flex-col flex-1 gap-4 p-2">
				<div className="flex gap-4  items-center">
					<div className="flex gap-1 flex-col">
						<h3 className="text-black text-base ">{name}</h3>
						<p className="text-text-GRAY text-xs">{title}</p>
					</div>
				</div>
				<p className="text-xl font-light">{about}</p>
			</div>
		</div>
	);
};
