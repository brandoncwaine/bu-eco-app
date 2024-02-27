import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';

type Props = {
	name: string;
	year_built: number;
	usedBy: string[];
	onClose: () => void;
};

function BuildingDetails({ name, year_built, usedBy, onClose }: Props) {
	return (
		<div className="absolute bottom-10 w-1/2 h-48 bg-zinc-100 rounded-md shadow-md p-4 border-b-4 border-violet-500 flex flex-col gap-2">
			<div>
				<h1 className="text-xl font-bold text-zinc-900">{name}</h1>
				<h2 className="text-lg text-zinc-800">Year Built: {year_built}</h2>
				<h2 className="text-lg text-zinc-800">Used By: {usedBy.join(', ')}</h2>
			</div>
			<button
				onClick={onClose}
				className="absolute bg-violet-500 top-[-25%] right-[-24px] text-white font-bold p-6 rounded-md m-auto block mt-5 border-b-2 border-violet-600 hover:bg-violet-700 transition-all"
			>
				<MdClose className="text-2xl" />
			</button>
		</div>
	);
}

export default BuildingDetails;
