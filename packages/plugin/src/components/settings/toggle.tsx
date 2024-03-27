import { Setting } from "./setting";

export const Toggle: React.FC<{
	name: string;
	description: string;
	value: boolean;
	onChange: (value: boolean) => void;
}> = ({ name, description, value, onChange }) => (
	<Setting
		name={name}
		description={description}
		builder={(setting) => setting.addToggle((toggle) => toggle.setValue(value).onChange(onChange))}
	/>
);
