import { H4 } from '@/components/common/typography';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search } from 'lucide-react';

type Props = {
	persons: Person[];
};
export function MessageAside({ persons }: Props) {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-6">
				<div className="relative">
					<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						className="pl-8 max-w-sm"
						type="search"
						placeholder="Search .."
					/>
				</div>
				<ul className="flex flex-col max-h-[680px]">
					<ScrollArea>
						{persons.map((person, index) => (
							<Box person={person} key={index} />
						))}
					</ScrollArea>
				</ul>
			</div>
		</div>
	);
}

type Person = {
	name: string;
	lastMessage: string;
	image: string;
	lastMessageTime: string;
};

type BoxProps = {
	person: Person;
};
function Box({
	person: { image, name, lastMessage, lastMessageTime },
}: BoxProps) {
	return (
		<li className="flex gap-2">
			<Avatar className="w-12 h-12 rounded-lg">
				<AvatarImage src={image} alt={name} />
				<AvatarFallback>ESI</AvatarFallback>
			</Avatar>
			<div className="flex gap-1">
				<div className="flex justify-between gap-4">
					<H4 className="text-base font-bold">{name}</H4>
					<p className="text-xs text-li">{lastMessageTime}</p>
				</div>
				<span className="text-xs text-li">{lastMessage}</span>
			</div>
		</li>
	);
}
