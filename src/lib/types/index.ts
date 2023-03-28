import { Gemoji } from "gemoji";

interface BaseSettings {
	input?: any;
	value?: string;
	setValue?: (value: string) => void;
	maxWidth?: string | number;
	maxHeight?: string | number;
	footer?: boolean;
	theme?: string;
	strict?:  boolean;
	listMax?: number;
	placeholder?: string;
	ariaLabel?: string;
	[x:string]: any;
}
export interface GemojiListItem extends Gemoji {
	active: boolean;
}
export type EmojiState = {
	list: GemojiListItem[];
	search: string;
	select: string
}

// Props
export interface EmojiPopupProps extends BaseSettings {
	value: string;
}
export interface EmojiListProps extends BaseSettings {
	active: boolean;
	list: any;
	setElIndex: (value: number) => void;
	mouseNav: boolean;
	setMouseNav: (value: boolean) => void;
	emoji: EmojiState;
}
export interface EmojiInputProps extends BaseSettings {
	value: string;
	active: boolean;
	setActive: (value: boolean) => void;
	setValue: (value: string) => void;
	list: any;
	emoji: EmojiState;
	setEmoji: (value: EmojiState) => void;
	selStart: number;
	setSelStart: (value: number) => void;
	setMouseNav: (value: boolean) => void;
}