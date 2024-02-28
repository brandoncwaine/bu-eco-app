import React, { useState } from 'react';
import { MdChevronRight, MdClose, MdGamepad } from 'react-icons/md';
import { Link } from 'react-router-dom';

import QuizQuestions from '../data/QuizQuestions.json';

const QUESTION_POOL_SIZE = 5;
const SCORE_MULTIPLIER = 10000;

type TQuestion = {
	question: string;
	options: string[];
	answer: string;
};

const getRandomQuestionPool = () => {
	const questionPool: TQuestion[] = [];
	for (let i = 0; i < QUESTION_POOL_SIZE; i++) {
		const randomIndex = Math.floor(
			Math.random() * QuizQuestions.questions.length
		);
		if (questionPool.includes(QuizQuestions.questions[randomIndex])) {
			i--;
			continue;
		}
		questionPool.push(QuizQuestions.questions[randomIndex]);
	}
	return questionPool;
};

const getRandomQuestion = ({ questionPool }: any) => {
	const randomIndex = Math.floor(Math.random() * questionPool.length);
	return questionPool[randomIndex];
};

function Quiz() {
	const questionPool = getRandomQuestionPool();
	const [score, setScore] = useState(0);

	const [questionIndex, setQuestionIndex] = useState(0);
	const [answered, setAnswered] = useState('');
	const [selectedAnswer, setSelectedAnswer] = useState('');

	const [question, setQuestion] = useState(
		getRandomQuestion({ questionPool: QuizQuestions.questions })
	);

	const onQuestionSubmit = (e: any) => {
		e.preventDefault();
		if (selectedAnswer === question.answer) {
			setScore(score + 1);
		}
		setAnswered(selectedAnswer);
		setSelectedAnswer('');
		setQuestionIndex(questionIndex + 1);
		setQuestion(getRandomQuestion({ questionPool: getRandomQuestionPool() }));
	};

	if (questionIndex === QUESTION_POOL_SIZE) {
		return (
			<div className="h-screen w-screen flex items-center justify-center">
				<div className="w-full flex flex-col justify-center items-center">
					<div className="flex flex-col justify-between w-1/2 bg-zinc-300 border-violet-600 p-8 rounded-md border-b-4 gap-4">
						<h1 className="text-2xl font-bold text-zinc-900">Quiz</h1>
						<h2 className="text-lg text-zinc-800">
							Your score is {score}/{QUESTION_POOL_SIZE}
						</h2>
						<h2 className="text-lg text-zinc-800">
							Either return to Tablot Campus, or play the Talbot Campus Eco Tycoon
							Minigame using your score{' '}
							<span className="font-bold">
								{score} =
								{(score * SCORE_MULTIPLIER).toLocaleString('en-US', {
									style: 'currency',
									currency: 'gbp',
									maximumFractionDigits: 0,
								})}{' '}
								Budget
							</span>
						</h2>
						<div className="flex flex-row justify-between w-full">
							<Link to={'/'}>
								<button className="flex flex-row m-6 gap-4 bg-red-500 text-white font-bold p-6 rounded-md mt-5 border-b-2 border-red-600 hover:bg-red-700 transition-all">
									<MdClose className="text-2xl" />
									Close Quiz
								</button>
							</Link>
							<Link to={'/minigame'}>
								<button className="flex flex-row m-6 gap-4 bg-violet-500 text-white font-bold p-6 rounded-md mt-5 border-b-2 border-violet-600 hover:bg-violet-700 transition-all">
									<MdGamepad className="text-2xl" />
									Play Minigame
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-zinc-100 h-screen w-screen">
			<Link to={'/'}>
				<button className="flex flex-row m-6 gap-4 bg-red-500 text-white font-bold p-6 rounded-md mt-5 border-b-2 border-red-600 hover:bg-red-700 transition-all">
					<MdClose className="text-2xl" />
					Cancel Quiz
				</button>
			</Link>
			<div className="w-full flex flex-col justify-center items-center">
				<div className="flex flex-col justify-between w-1/2 bg-zinc-300 border-violet-600 p-8 rounded-md border-b-4 gap-4">
					<h1 className="text-2xl font-bold text-zinc-900">Quiz</h1>
					<div className="flex flex-col">
						<h2 className="text-lg text-zinc-800">{question.question}</h2>
						{question.options.map((option: string) => (
							<button
								key={option}
								onClick={() => setSelectedAnswer(option)}
								style={{
									backgroundColor:
										selectedAnswer === option ? 'rgb(109 40 217)' : 'rgb(167 139 250)',
								}}
								className="bg-violet-500 text-left text-white font-bold py-4 px-6 rounded-md mt-5 border-b-2 border-violet-800 hover:bg-violet-700 transition-all"
							>
								{option}
							</button>
						))}
					</div>
					<button
						style={{
							backgroundColor: answered === selectedAnswer ? 'gray' : 'rgb(34 197 94)',
						}}
						onClick={onQuestionSubmit}
						className="flex flex-row gap-4 w-32  self-end text-white font-bold py-4 px-6 rounded-md mt-5 border-b-2 transition-all"
					>
						Next
						<MdChevronRight className="text-2xl" />
					</button>
				</div>
			</div>
		</div>
	);
}

export default Quiz;
