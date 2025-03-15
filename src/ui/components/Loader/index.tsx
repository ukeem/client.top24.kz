import React from "react";
import s from './index.module.scss'

export default function Loader() {
	return (
		<div className={s.loadingContainer}>
			<div className={s.loader}></div>
		</div>
	);
};
