import "./PostPeep.css";

import axios from "axios";

import { useEffect, useState, useRef } from "react";

import { getToken } from "../../utils/auth.js";
import Avatar from "../Avatar/Avatar.jsx";

const PostPeep = ({ name, getPeeps }) => {
	const contentRef = useRef(null);

	const [content, setContent] = useState("");

	const { firstname, lastname } = name;

	function handleContentChange(e) {
		setContent(e.target.value);
	}

	useEffect(() => {
		console.log(content);
	}, [content]);

	const handlePost = async (e) => {
		e.preventDefault();
		console.log("posting::::", content);
		try {
			const response = await axios.post(
				"http://localhost:4000/api/peep",
				{
					content: content,
				},
				{
					headers: {
						Authorization: `Bearer ${getToken()}`,
					},
				}
			);
			console.log(response);
			contentRef.current.value = "";
			setContent("");
			getPeeps();
		} catch (error) {
			console.error(error);
		}
	};

	function resize(e) {
		e.target.style.height = "auto";
		e.target.style.height = e.target.scrollHeight + "px";
	}

	return (
		<div className="post-peep-container">
			<div className="input-container">
				<Avatar firstname={firstname} lastname={lastname} />
				<form className="peep-form">
					<div className="input-group">
						<textarea
							className="peep-textarea form-control p-0"
							aria-label="textarea"
							onChange={handleContentChange}
							onInput={resize}
							ref={contentRef}
							placeholder="Share a Peep..."
						></textarea>
					</div>
					<div className="non-input-container">
						<p className="count m-0">
							Characters: <span>{content.trim().length}</span>/420
						</p>
						<button
							className="post-btn"
							type="submit"
							disabled={!content.trim()}
							onClick={handlePost}
						>
							Post
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default PostPeep;
