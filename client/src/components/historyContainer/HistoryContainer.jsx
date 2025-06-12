import { v4 } from 'uuid';

const HistoryContainer = ({ messages }) => {
	return (
		<div>
			<h2>History</h2>
			<ul>
				{messages.map(msg => (
					<li key={v4()}>
						<span>{msg.user}:</span> {msg.message}
					</li>
				))}
			</ul>
		</div>
	);
};

export default HistoryContainer;
