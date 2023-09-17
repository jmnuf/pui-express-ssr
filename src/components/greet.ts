
export function Greet(name: string) {
	return {
		name,
		tempate: `<p>Greetings \${name}</p>`,
	};
}
