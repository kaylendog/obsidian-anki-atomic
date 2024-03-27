import { Setting } from "./setting";

export const Textbox: React.FC<{
	name: string;
	description: string;
	placeholder?: string;
	value: string;
	onChange: (value: string) => void;
}> = ({ name, description, placeholder, value, onChange }) => (
	<Setting
		name={name}
		description={description}
		builder={(setting) =>
			setting.addText((text) =>
				text
					.setValue(value)
					.setPlaceholder(placeholder ?? "")
					.onChange(onChange)
			)
		}
	/>
);
