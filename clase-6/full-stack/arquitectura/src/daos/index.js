import { ContactDao as ContactDaoMongo } from "./mongodb";
import { ContactDao as ContactDaoMemory } from "./memory";
import { PERSISTANCE } from "../common/constants/persistance";

function getDaos({ persistence }) {
    switch (persistence) {
        case PERSISTANCE.MONGODB:
            return {
                ContactDao: new ContactDaoMongo(),
            };
        case PERSISTANCE.MEMORY:
            return {
                ContactDao: new ContactDaoMemory(),
            };
        default:
            return {
                ContactDao: new ContactDaoMemory(),
            };
    }
}

// Exportar directamente el resultado de getDaos
export const contactdao = getDaos();
