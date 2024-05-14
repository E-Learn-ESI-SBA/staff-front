import React from 'react';
import Card from '@/components/dashboard/student/home/card';
import MsgBox from '@/components/dashboard/student/home/msgBox';
import NavBar from '@/components/dashboard/student/navBar';
import TrialClass from '@/components/dashboard/student/home/trialClass';
import UpcommingCard from '@/components/dashboard/student/home/upcommingCard';
export default function QuizTable() {
	const tasks: [string, string][] = [
		['Lorem epsssss', '12:00 PM'],
		['Lorem epsssss', '12:00 PM'],
		['Lorem epsssss', '12:00 PM'],
	];

	return (
		<div className="bg-secondary-background lg:h-lvh">
			<NavBar title="Hello Hakim" />
			<div className="flex justify-between mt-4">
				<div className="w-[66%]">
					<div className="m-4">
						<div className="flex w-full justify-between my-4">
							<Card
								title="Learning Time"
								value="2h 37m"
								icon="/assets/icons/home/time.svg"
							/>
							<Card
								title="Learning Time"
								value="2h 37m"
								icon="/assets/icons/home/time.svg"
							/>
						</div>
						<TrialClass />
						<div></div>
					</div>
				</div>
				<div className="w-[33%] right">
					<MsgBox />
					<UpcommingCard title="Upcoming Task" points={tasks} />
					<UpcommingCard title="Upcoming Task" points={tasks} />
					<div className=""></div>
				</div>
			</div>
		</div>
	);
}
