import React from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownRendererProps {
	content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
	return <div className="">
		<ReactMarkdown>{content}</ReactMarkdown>
	</div>;
};

export default MarkdownRenderer;
