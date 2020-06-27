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

  componentDidMount() {
    if (localStorage.getItem('contacts'))
      this.setState({ contacts: JSON.parse(localStorage.getItem('contacts')) });
  }

  componentDidUpdate(prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState)
      localStorage.setItem('contacts', JSON.stringify(contacts));
  }

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

  formSubmitHandler = contact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, { id: uuidv4(), ...contact }],
    }));
  };

  render() {
    const { filter, contacts } = this.state;
    return (
      <Container>
        <Section title="Phonebook">
          <ContactsForm
            onSubmit={this.formSubmitHandler}
            issetContacts={this.getContactsName}
          />
        </Section>
        {contacts.length > 0 && (
          <Section title="Contacts">
            <Filter value={filter} onChange={this.changeFilter} />
            <ContactList
              contacts={this.getFilteredContacts()}
              deleteContact={this.deleteContact}
            />
          </Section>
        )}
      </Container>
    );
  }
}

export default App;
