import { MdDone } from 'react-icons/md';
import { Link } from 'react-router-dom';

type TResults = {
	totalMoneySpent: number;
	totalMoneySaved: number;
	naturePoints: number;
	totalEffect: number;
};

const Results = ({
	totalMoneySpent,
	totalMoneySaved,
	naturePoints,
	totalEffect,
}: TResults) => {
	return (
		<div className="absolute bg-zinc-200 w-screen h-screen flex justify-center items-center z-50">
			<div className=" w-1/2 h-1/2 bg-zinc-100 border-violet-500 border-b-4 rounded-lg flex flex-col items-center justify-between text-center p-6">
				<h1 className="text-2xl font-bold text-zinc-900">Congratulations!</h1>
				<h2 className="text-md text-zinc-800">
					You have successfully completed the minigame!
				</h2>
				<div>
					<h2 className="text-md text-zinc-600 font-bold">
						Total money spent: {totalMoneySpent}
					</h2>
					<h2 className="text-md text-zinc-600 font-bold">
						Total money saved: {totalMoneySaved}
					</h2>
					<h2 className="text-md text-zinc-600 font-bold">
						Total nature points: {naturePoints}
					</h2>
					<h2 className="text-xl text-zinc-800 font-bold">
						Score: {Math.round(totalEffect)} points
					</h2>
				</div>
				<Link to={'/'}>
					<button className="bg-green-500 text-white font-bold px-12 py-4 rounded-md m-auto flex flex-row gap-5 mt-5 border-b-2 border-green-600 hover:bg-green-700 transition-all">
						<MdDone className="text-2xl" />
						Finish
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Results;
