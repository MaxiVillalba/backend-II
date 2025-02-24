import { Contact } from '../../models/mongodb/contact.model.js'; // Asegúrate de incluir ".js" si usas ES Modules

class ContactDAO {
  async getAll() {
    return await Contact.find();
  }

  async getById(id) {
    return await Contact.findById(id);
  }

  async create(contact) {
    return await Contact.create(contact);
  }
}

export const contactDAO = new ContactDAO();
