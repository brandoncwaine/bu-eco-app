import React, { useEffect, useState } from 'react';

import Spline from '@splinetool/react-spline';
import {
	MdClose,
	MdDone,
	MdElectricBolt,
	MdGasMeter,
	MdMoney,
	MdPerson,
	MdRecycling,
	MdWaterDrop,
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import Completed from './Results';

type TBuildingDetailsInfo = {
	[key: string]: {
		name: string;
		stats: {
			water: {
				usage: number;
				renewable: number;
			};
			gas: {
				usage: number;
				renewable: number;
			};
			electric: {
				usage: number;
				renewable: number;
			};
		};
		upgrades: {
			[key: string]: {
				cost: number;
				effect: string;
				effectValue: number;
				purchased: boolean;
				moneySavedPerYear: number;
			};
		};
	};
};

const tutorialData = [
	{
		title: 'Welcome to the BU ECO Minigame!',
		content:
			'In this minigame, you will be given a budget of £100,000 to spend on the buildings at BU. Your goal is to spend the budget wisely and learn more about the buildings at BU.',
	},
	{
		title: 'Press on buildings to choose upgrades',
		content: 'Improve the buildings energy efficiency, water usage and more!',
	},
	{
		title: 'Why is becoming carbon neutral difficult?',
		content:
			'You will discover why making sustainable choices can be hard, spend your budget wisely and learn more about the impact of the upgrades!',
	},
	{
		title: 'Ready to play?',
		content: 'Press the button below to start the minigame!',
	},
];

const buildingDetailsInfo: TBuildingDetailsInfo = {
	['Poole House (P)']: {
		name: 'Poole House (P)',
		stats: {
			water: {
				usage: 100, //In litres
				renewable: 10, //In percentage
			},
			gas: {
				usage: 100,
				renewable: 15,
			},
			electric: {
				usage: 100,
				renewable: 5,
			},
		},
		upgrades: {
			['LED Light Bulbs']: {
				cost: 10000,
				effect: 'electric',
				effectValue: 7,
				purchased: false,
				moneySavedPerYear: 4000,
			},
			['IT Servers']: {
				cost: 15000,
				effect: 'electric',
				effectValue: 6,
				purchased: false,
				moneySavedPerYear: 3000,
			},
			['Reduce Heating Usage']: {
				cost: 0,
				effect: 'gas',
				effectValue: 20,
				purchased: false,
				moneySavedPerYear: 2000,
			},
		},
	},
	['Dorset House (D)']: {
		name: 'Dorset House (D)',
		stats: {
			water: {
				usage: 100,
				renewable: 15,
			},
			gas: {
				usage: 100,
				renewable: 10,
			},
			electric: {
				usage: 100,
				renewable: 5,
			},
		},
		upgrades: {
			['Solar Panels']: {
				cost: 10000,
				effect: 'electric',
				effectValue: 18.5,
				purchased: false,
				moneySavedPerYear: 8000,
			},
			['Heading Pump']: {
				cost: 40000,
				effect: 'electric',
				effectValue: 5,
				purchased: false,
				moneySavedPerYear: 5000,
			},
			['Lighting Controls']: {
				cost: 8000,
				effect: 'electric',
				effectValue: 2,
				purchased: false,
				moneySavedPerYear: 2000,
			},
		},
	},
	['Fusion (F)']: {
		name: 'Fusion (F)',
		stats: {
			water: {
				usage: 100,
				renewable: 6,
			},
			gas: {
				usage: 100,
				renewable: 10,
			},
			electric: {
				usage: 100,
				renewable: 5,
			},
		},
		upgrades: {
			['Energy Efficient Windows']: {
				cost: 20000,
				effect: 'gas',
				effectValue: 7,
				purchased: false,
				moneySavedPerYear: 1260,
			},
			['Heating Pump']: {
				cost: 40000,
				effect: 'electric',
				effectValue: 5,
				purchased: false,
				moneySavedPerYear: 4000,
			},
			['Lighting Controls']: {
				cost: 8000,
				effect: 'electric',
				effectValue: 2,
				purchased: false,
				moneySavedPerYear: 2000,
			},
		},
	},
	['Kimmeridge (K)']: {
		name: 'Kimmeridge (K)',
		stats: {
			water: {
				usage: 100,
				renewable: 20,
			},
			gas: {
				usage: 100,
				renewable: 80,
			},
			electric: {
				usage: 100,
				renewable: 10,
			},
		},
		upgrades: {
			['Solar Panels']: {
				cost: 10000,
				effect: 'electric',
				effectValue: 18.5,
				purchased: false,
				moneySavedPerYear: 8000,
			},
			['LED Light Bulbs']: {
				cost: 5000,
				effect: 'electric',
				effectValue: 7,
				purchased: false,
				moneySavedPerYear: 4000,
			},
			['Building Insulation']: {
				cost: 40000,
				effect: 'gas',
				effectValue: 6,
				purchased: false,
				moneySavedPerYear: 1080,
			},
		},
	},
};

type TStatistic = {
	icon: React.ReactNode;
	label: string;
	value: string;
};

const Statistic = ({ icon, label, value }: TStatistic) => {
	return (
		<div className="flex flex-row bg-white w-64 h-14 rounded-xl overflow-hidden">
			<div className="w-14 aspect-square bg-purple-500 flex items-center justify-center">
				{icon}
			</div>
			<div className="p-2">
				<h1 className="text-sm text-zinc-500">{label}</h1>
				<h1 className="text-lg font-bold text-zinc-600">{value}</h1>
			</div>
		</div>
	);
};

function Minigame() {
	const [budget, setBudget] = useState(100000);
	const [spent, setSpent] = useState(0);
	const [totalEffect, setTotalEffect] = useState(0);

	const [completed, setCompleted] = useState(false);

	const [statistics, setStatistics] = useState({
		['Sastisfaction']: 98,
		['Nature Points']: 0,
		['Money saved per year']: 0,
	});

	const [tutorialIndex, setTutorialIndex] = useState(0);

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

	const onTutorialNext = () => {
		if (tutorialIndex === tutorialData.length - 1) {
			setIntroShown(false);
			return;
		}

		setTutorialIndex(tutorialIndex + 1);
	};

	const buyUpgrade = (building: string, upgrade: string) => {
		const cost = buildingDetailsInfo[building].upgrades[upgrade].cost;
		if (cost > budget) return;

		setBudget(budget - cost);
		setSpent(spent + cost);

		setStatistics({
			...statistics,
			['Money saved per year']:
				statistics['Money saved per year'] +
				buildingDetailsInfo[building].upgrades[upgrade].moneySavedPerYear,
			['Nature Points']: statistics['Nature Points'] + 1,
		});

		const effect = buildingDetailsInfo[building].upgrades[upgrade].effect;
		const effectValue =
			buildingDetailsInfo[building].upgrades[upgrade].effectValue;

		if (upgrade === 'Reduce Heating Usage') {
			setStatistics({
				...statistics,
				['Sastisfaction']: statistics['Sastisfaction'] - 15,
			});
		}

		if (effect === 'electric') {
			buildingDetailsInfo[building].stats.electric.renewable += effectValue;
		} else if (effect === 'gas') {
			buildingDetailsInfo[building].stats.gas.renewable += effectValue;
		} else if (effect === 'water') {
			buildingDetailsInfo[building].stats.water.renewable += effectValue;
		}

		setTotalEffect(totalEffect + effectValue);

		console.log(buildingDetailsInfo[building].stats);

		buildingDetailsInfo[building].upgrades[upgrade].purchased = true;
	};

	return (
		<div className="w-screen h-screen flex justify-center items-center">
			{!introShown && (
				<>
					{completed && (
						<Completed
							totalMoneySpent={spent}
							totalMoneySaved={statistics['Money saved per year']}
							naturePoints={statistics['Nature Points']}
							totalEffect={totalEffect}
						/>
					)}
					{selected ? (
						<div className="absolute bottom-10 w-1/2 h-72 bg-zinc-100 rounded-md shadow-md p-4 border-b-4 border-violet-500 flex flex-row justify-between gap-2">
							<div>
								<h1 className="text-xl font-bold text-zinc-900">
									{buildingDetailsInfo[selected].name}
								</h1>
								<div className="flex flex-col items-start gap-2">
									<h1 className="text-md text-zinc-600 font-bold"> Stats </h1>
									<h2 className="flex flex-col text-md items-start gap-2 text-zinc-800">
										Water Eco Usage: {buildingDetailsInfo[selected].stats.water.renewable}
										%
										<div className="flex flex-row gap-2">
											<MdWaterDrop />
											<div className="w-64 h-4 rounded-full bg-blue-400 border-blue-500 border-b-2">
												<div
													style={{
														width: buildingDetailsInfo[selected].stats.water.renewable + '%',
													}}
													className="h-full rounded-full bg-blue-300 transition-all"
												></div>
											</div>
										</div>
									</h2>
									<h2 className="flex flex-col items-start text-md gap-2 text-zinc-800">
										Gas Eco Usage: {buildingDetailsInfo[selected].stats.gas.renewable}%
										<div className="flex flex-row gap-2">
											<MdGasMeter />
											<div className="w-64 h-4 rounded-full bg-green-500 border-b-2 border-green-600">
												<div
													style={{
														width: buildingDetailsInfo[selected].stats.gas.renewable + '%',
													}}
													className="h-full rounded-full bg-green-400 transition-all"
												></div>
											</div>
										</div>
									</h2>
									<h2 className="flex flex-col items-start gap-2 text-md text-zinc-800">
										Electric Eco Usage:{' '}
										{buildingDetailsInfo[selected].stats.electric.renewable}%
										<div className="flex flex-row gap-2">
											<MdElectricBolt />
											<div className="w-64 h-4 rounded-full bg-yellow-500 border-b-2 border-yellow-600">
												<div
													style={{
														width:
															buildingDetailsInfo[selected].stats.electric.renewable + '%',
													}}
													className="h-full rounded-full bg-yellow-400 transition-all"
												></div>
											</div>
										</div>
									</h2>
								</div>
							</div>
							<div className="flex flex-col justify-end gap-3">
								{Object.keys(buildingDetailsInfo[selected].upgrades).map((upgrade) => (
									<button
										key={upgrade}
										onClick={() => buyUpgrade(selected, upgrade)}
										style={{
											backgroundColor: buildingDetailsInfo[selected].upgrades[upgrade]
												.purchased
												? 'gray'
												: 'green',
										}}
										className="w-64 h-16 px-4 py-3 rounded-md text-sm font-bold text-white flex flex-col justify-center items-center"
									>
										{upgrade}
										<br></br>
										{buildingDetailsInfo[selected].upgrades[upgrade].cost.toLocaleString(
											'en-us',
											{
												style: 'currency',
												currency: 'gbp',
												maximumFractionDigits: 0,
											}
										)}
									</button>
								))}
							</div>
							<button
								onClick={() => setSelected('')}
								className="absolute bg-violet-500 top-[-15%] right-[-24px] text-white font-bold p-6 rounded-md m-auto block mt-5 border-b-2 border-violet-600 hover:bg-violet-700 transition-all"
							>
								<MdClose className="text-2xl" />
							</button>
						</div>
					) : (
						<div className="absolute bottom-10 w-1/2 h-36 bg-zinc-100 rounded-md shadow-md overflow-hidden border-b-4 border-violet-500 flex flex-row justify-between gap-2">
							<div className="flex p-4">
								<h1 className="text-md font-bold text-zinc-900">
									Select a building to view details
								</h1>
							</div>
						</div>
					)}
					<div className="absolute w-screen top-0">
						<div className="flex flex-row items-center gap-2 justify-between px-4">
							<div className="flex flex-row gap-2 items-center">
								<div>
									<div className="w-24 aspect-square flex items-center justify-center rounded-full bg-white m-6 text-zinc-800 font-bold text-4xl border-4 border-violet-500">
										A+
									</div>
								</div>
								<Statistic
									icon={<MdPerson className="text-3xl text-white" />}
									label="Sastisfaction"
									value={String(statistics['Sastisfaction']) + '%'}
								/>
								<Statistic
									icon={<MdRecycling className="text-3xl text-white" />}
									label="Nature Points"
									value={String(statistics['Nature Points'])}
								/>
								<Statistic
									icon={<MdMoney className="text-3xl text-white" />}
									label="Saved per year"
									value={statistics['Money saved per year'].toLocaleString('en-us', {
										style: 'currency',
										currency: 'gbp',
									})}
								/>
							</div>
							<Statistic
								icon={<MdMoney className="text-3xl text-white" />}
								label="Budget"
								value={budget.toLocaleString('en-us', {
									style: 'currency',
									currency: 'gbp',
								})}
							/>
						</div>
					</div>
					<Link to={'/'}>
						<button className="absolute bottom-0 flex flex-row m-6 gap-4 bg-red-500 text-white font-bold p-6 rounded-md mt-5 border-b-2 border-red-600 hover:bg-red-700 transition-all">
							<MdClose className="text-2xl" />
							Cancel Minigame
						</button>
					</Link>
					<button
						onClick={() => setCompleted(true)}
						className="absolute bottom-0 right-0 flex flex-row m-6 gap-4 bg-green-500 text-white font-bold p-6 rounded-md mt-5 border-b-2 border-green-600 hover:bg-green-700 transition-all"
					>
						<MdDone className="text-2xl" />
						Finish
					</button>
				</>
			)}
			<Spline
				onLoad={onLoad}
				onMouseDown={onMouseDown}
				scene="https://prod.spline.design/F-E4Vxx-mcy5qIv1/scene.splinecode"
			/>
			{introShown && (
				<div className="absolute flex flex-col gap-8 w-1/2 h-1/2 bg-zinc-50 p-10 rounded-md shadow-md border-b-4 border-violet-800">
					<h1 className="text-2xl text-center m-auto font-bold text-zinc-900">
						{tutorialData[tutorialIndex].title}
					</h1>
					<h2 className="text-xl text-center m-auto text-zinc-800">
						{tutorialData[tutorialIndex].content}
					</h2>
					<h2 className="text-xl text-center m-auto text-zinc-800">
						You have a budget of{' '}
						<span className="text-blue-500">
							{budget.toLocaleString('en-us', {
								style: 'currency',
								currency: 'gbp',
								maximumFractionDigits: 0,
							})}
						</span>
						.
					</h2>
					<button
						onClick={() => onTutorialNext()}
						className="bg-green-500 text-white font-bold px-12 py-4 rounded-md m-auto block mt-5 border-b-2 border-green-800 hover:bg-green-700 transition-all"
					>
						{tutorialData[tutorialIndex].title === 'Ready to play?' ? 'Play' : 'Next'}
					</button>
				</div>
			)}
		</div>
	);
}

export default Minigame;
