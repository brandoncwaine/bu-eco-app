import { lazy, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BuildingDetails from '../components/BuildingDetails';

import Spline from '@splinetool/react-spline';

type TBuildingDetailsInfo = {
	[key: string]: {
		name: string;
		year_built: number;
		usedBy: string[];
	};
};

const buildingDetailsInfo: TBuildingDetailsInfo = {
	['Poole House (P)']: {
		name: 'Poole House (P)',
		year_built: 1995,
		usedBy: ['Business School'],
	},
	['Dorset House (D)']: {
		name: 'Dorset House (D)',
		year_built: 2016,
		usedBy: ['Computing'],
	},
	['Fusion (F)']: {
		name: 'Fusion (F)',
		year_built: 2016,
		usedBy: ['Fusion Building'],
	},
	['Kimmeridge (K)']: {
		name: 'Kimmeridge (K)',
		year_built: 2016,
		usedBy: ['Kimmeridge House'],
	},
};

function App() {
	const [spline, setSpline] = useState<any>();
	const [introShown, setIntroShown] = useState(true);
	const [selected, setSelected] = useState<string>('');

	const resetHighlight = (spline: any) => {
		spline.emitEventReverse('mouseDown', 'Poole House (P)');
		spline.emitEventReverse('mouseDown', 'Dorset House (D)');
		spline.emitEventReverse('mouseDown', 'Fusion (F)');
		spline.emitEventReverse('mouseDown', 'Kimmeridge (K)');

		setSelected('');
	};

	const onMouseDown = (e: any) => {
		if (e.target) {
			setSelected(e.target.name);
		}
	};

	useEffect(() => {
		if (!spline) return;

		resetHighlight(spline);
		spline.emitEvent('mouseDown', selected);
	}, [selected]);

	const onLoad = (_spline: any) => {
		setSpline(_spline);
	};

	return (
		<div className="w-screen h-screen flex justify-center items-center">
			{!introShown && (
				<>
					{selected ? (
						<BuildingDetails
							name={buildingDetailsInfo[selected].name}
							year_built={buildingDetailsInfo[selected].year_built}
							usedBy={buildingDetailsInfo[selected].usedBy}
							onClose={() => setSelected('')}
						/>
					) : (
						<div className="absolute bottom-10 w-1/2 h-36 bg-zinc-100 rounded-md shadow-md overflow-hidden border-b-4 border-violet-500 flex flex-row justify-between gap-2">
							<div className="flex p-4">
								<h1 className="text-md font-bold text-zinc-900">
									Select a building to view details
								</h1>
							</div>
							<div className="flex flex-col justify-end  bg-zinc-200 p-4">
								<h1 className="text-md font-bold text-zinc-900">Play Minigame</h1>
								<Link to="/quiz">
									<button className="bg-violet-500 text-white font-bold px-12 py-4 rounded-md block mt-5 border-b-2 border-violet-800 hover:bg-violet-700 transition-all">
										Play
									</button>
								</Link>
							</div>
						</div>
					)}
				</>
			)}
			<Spline
				onLoad={onLoad}
				onMouseDown={onMouseDown}
				scene="https://prod.spline.design/F-E4Vxx-mcy5qIv1/scene.splinecode"
			/>
			{introShown && (
				<div className="absolute flex flex-col gap-8 w-1/2 bg-zinc-50 p-10 rounded-md shadow-md border-b-4 border-violet-800">
					<h1 className="text-4xl text-center m-auto font-bold text-zinc-900">
						BU ECO
					</h1>
					<h2 className="text-xl text-center m-auto text-zinc-800">
						Welcome to the BU ECO website. This is a test website for the BU ECO
						system.
					</h2>
					<button
						onClick={() => setIntroShown(false)}
						className="bg-violet-500 text-white font-bold px-12 py-4 rounded-md m-auto block mt-5 border-b-2 border-violet-800 hover:bg-violet-700 transition-all"
					>
						Start
					</button>
				</div>
			)}
		</div>
	);
}

export default App;
