module.exports = {
	root: true,

	parser: '@typescript-eslint/parser',

	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
	},

	env: {
		'react-native/react-native': true,
	},

	plugins: ['react', 'react-native'],

	overrides: [
		{
			files: ['**/*.{ts,tsx}'],
			parser: '@typescript-eslint/parser',
			plugins: ['@typescript-eslint/eslint-plugin'],
		},
	],

	extends: ['prettier'],
};
