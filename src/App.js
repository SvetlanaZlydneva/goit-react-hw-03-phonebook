import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Container from './components/Container';
import Section from './components/Section';
import ContactsForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  formSubmitHandler = contact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, { id: uuidv4(), ...contact }],
    }));
  };

  getContactsName = () => {
    const { contacts } = this.state;
    return contacts.map(contact => contact.name.toLowerCase());
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { filter } = this.state;
    return (
      <Container>
        <Section title="Phonebook">
          <ContactsForm
            onSubmit={this.formSubmitHandler}
            issetContacts={this.getContactsName}
          />
        </Section>
        <Section title="Contacts">
          <Filter value={filter} onChange={this.changeFilter} />
          <ContactList
            contacts={this.getFilteredContacts()}
            deleteContact={this.deleteContact}
          />
        </Section>
      </Container>
    );
  }
}

export default App;
