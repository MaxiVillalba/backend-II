const contacts = [];

export class ContactDAO {
    async getAll() {
        return contacts;
    }

    async getById({id}) {
        return contacts.find
    }
}