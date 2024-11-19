function validateNumberInputInTextField(event: any, allowDecimal: boolean = true, allowNegative: boolean = true): boolean {
	const key = event.key;
	const value = event.target.value;

	if (value.indexOf('.') > -1) {
		allowDecimal = false;
	}

	const isNumberKey = key >= '0' && key <= '9';
	const isNumpadNumberKey = event.keyCode >= 96 && event.keyCode <= 105;
	const isMinusKey = allowNegative && key === '-' && (value === '' || value === '-');
	const isDecimalKey = allowDecimal && (key === '.' || key === ',');
	const isNavigationKey = event.keyCode >= 35 && event.keyCode <= 40; // Home, End, Arrows
	const isEditKey = key === 'Backspace' || key === 'Delete' || key === 'Tab';

	const isAllowedKey = isNumberKey || isNumpadNumberKey || isMinusKey || isDecimalKey || isNavigationKey || isEditKey;

	return isAllowedKey || (event.ctrlKey && (key === 'c' || key === 'x' || key === 'v' || key === 'a'));

};

function roundWithPrecision(num: number, precision: number): number {
	const multiplier = Math.pow(10, precision);
	return Math.round(num * multiplier) / multiplier;
}

export {
	validateNumberInputInTextField,
	roundWithPrecision
};