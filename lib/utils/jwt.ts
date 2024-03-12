function base64UrlDecode(str: string): string {
	let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
	while (base64.length % 4) {
		base64 += '=';
	}
	return atob(base64);
}

interface DecodedToken {
	header: object;
	payload: {
		email: string;
		user_id: number;
	};
	signature: string;
}

export function decodeJwt(token: string): DecodedToken {
	const [header, payload, signature] = token.split('.');

	const decodedHeader = JSON.parse(base64UrlDecode(header));
	const decodedPayload = JSON.parse(base64UrlDecode(payload));

	return {
		header: decodedHeader,
		payload: decodedPayload,
		signature,
	};
}