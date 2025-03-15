import type { FC } from 'react';

interface HomeIconProps extends React.SVGProps<SVGSVGElement> { }

const HomeIcon: FC<HomeIconProps> = (props) => {
	return (
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M2.66667 14V6L8 2L13.3333 6V14H9.33333V9.33333H6.66667V14H2.66667Z" fill="none" />
		</svg>
	);
}

export default HomeIcon;

