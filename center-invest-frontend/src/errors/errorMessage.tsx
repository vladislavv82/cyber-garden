interface ErrorMessageProps {
	message?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
	if (!message) return null;
    
	return (
		<p style={{ color: 'tomato', margin: '2px auto 0', textAlign: 'left', fontSize: 14 }}>
			{message}
		</p>
	);
};
