import axios from "axios";
import { baseUrl } from "./apiconfig";

function getConfig() {
	const user = JSON.parse(sessionStorage.getItem("user"));
	let config = {};
	if (user?.token) {
		config = {
			headers: {
				Authorization: `Bearer ${user?.token}`,
			},
		};
	}
	return config;
}

export async function getAllQuotes() {
	const url = `${baseUrl}/quote`;
	const resp = await axios.get(url, getConfig());
	if (resp.status !== 200)
		// check axios resp status (200 or else)
		throw new Error("Axios API call Error");
	// get axios resp data - result
	const result = resp.data;
	if (result.status !== "success")
		// if api status is not success ("error"), then get the message
		throw new Error(result.message);
	const data = result.data;
	return data;
}


export async function getQuotesById(id) {
	const url = `${baseUrl}/books/byid/${id}`;
	const resp = await axios.get(url);
	if (resp.status !== 200)
		// check axios resp status (200 or else)
		throw new Error("Axios API call Error");
	// get axios resp data - result
	const result = resp.data;
	if (result.status !== "success")
		// if api status is not success ("error"), then get the message
		throw new Error(result.message);
	const data = result.data;
	return data;
}


export async function addQuote(author, contents) {
	const url = `${baseUrl}/quote`;
	const reqbody = {author, contents};
	const resp = await axios.post(url, reqbody);
	console.log(resp);
	if (resp.status !== 200)
		// check axios resp status (200 or else)
		throw new Error("Axios API call Error");
	// get axios resp data - result
	const result = resp.data;
	if (result.status !== "success")
		// if api status is not success ("error"), then get the message
		throw new Error(result.message);
	const data = result.data;
	return data;
}