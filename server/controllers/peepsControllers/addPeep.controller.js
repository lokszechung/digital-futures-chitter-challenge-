import { addPeepService } from "../../services/peepsServices/addPeep.service.js";

export const addPeep = async (req, res) => {
	try {
		const peep = await addPeepService.addPeep(req);
		return res.status(201).json(peep);
	} catch (err) {
		if (err.name === "ValidationError") {
			return res.status(422).json({ message: "Peep content cannot be empty" });
		}
		return res.status(500).json({ message: err.message });
	}
};
