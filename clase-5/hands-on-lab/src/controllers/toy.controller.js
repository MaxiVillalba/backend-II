import { isValidObjectId } from 'mongoose';
import { toyService } from '../services/index.service.js';

class ToyController {
    async getAll(req, res) {
        const toys = await toyService.getAll();
        res.status(200).json(toys);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
             const isValidId = isValidObjectId(id); 
             if (!isValidId) {
                return res.status(400).json({ message: "Invalid Id" });
             }
             const toy = await toyService.getById({id});
                if (!toy) {
                    return res.status(404).json({ message: "Toy not found" });
                }
                res.status(200).json(toy);
                } catch (error) {
                    res.status(500).json({ message: error.message });
                }
    }
    async create (req, res) {
        try {
            const { name, description, price, stock } = req.body;
            if (!name || !description || !price || !stock) {
                return res.status(400).json({ message: "Missing required information" });
            }

            const toy = await toyService.create({
                toy: {
                    name, 
                    description, 
                    price,
                },
            });
            res.status(201).json(toy);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export const toyController = new ToyController();