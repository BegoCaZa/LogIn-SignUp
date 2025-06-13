const URL_BASE = 'http://localhost:3000';
const URL_API = '/api/chat/';

export const saveMessage = async body => {
	console.log(body);
	try {
		const response = await fetch(URL_BASE + URL_API, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: { 'Content-Type': 'application/json' }
		});
		const messages = await response.json();

		return messages;
	} catch (error) {
		console.log(error);
	}
};

export const getAllMessages = async () => {
	try {
		const response = await fetch(URL_BASE + URL_API);
		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			return [];
		}
	} catch (error) {
		throw new Error(error);
	}
};
