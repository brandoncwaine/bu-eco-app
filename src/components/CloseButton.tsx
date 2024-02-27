import React from 'react';
import { MdClose } from 'react-icons/md';

type Props = {
	onClose?: () => void;
};

function CloseButton({}: Props) {
	return (
		<button className="absolute bg-violet-500 top-[-25%] right-[-24px] text-white font-bold p-6 rounded-md m-auto block mt-5 border-b-2 border-violet-600 hover:bg-violet-700 transition-all">
			<MdClose className="text-2xl" />
		</button>
	);
}

export default CloseButton;
