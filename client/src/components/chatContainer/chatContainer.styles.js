import styled from 'styled-components';

export const StyledChatContainer = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 16px;
	padding: 16px;
	width: 70%;
	border: 1px solid black;
`;
export const StyledMessage = styled.li`
	color: black;
	background-color: cyan;
	padding: 8px;
	border-radius: 8px;
	width: 100%;
`;
export const StyledGeneralContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	width: 100%;
	align-items: center;
`;
