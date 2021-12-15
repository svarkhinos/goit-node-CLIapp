const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  const content = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(content);
};

const getContactById = async (contactId) => {
  const contacts = JSON.parse(await fs.readFile(contactsPath, "utf8"));
  const [result] = contacts.filter((contact) => contact.id === contactId);
  return result;
};

const removeContact = async (contactId) => {
  const contacts = JSON.parse(await fs.readFile(contactsPath, "utf8"));
  const indexContactDelete = contacts.findIndex(
    (contact) => contact.id === contactId
  );

  contacts.splice(indexContactDelete, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts;
};

const addContact = async (name, email, phone) => {
  const contacts = JSON.parse(await fs.readFile(contactsPath, "utf8"));
  const newContact = { name, email, phone, id: crypto.randomUUID() };

  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

module.exports = { listContacts, getContactById, removeContact, addContact };
