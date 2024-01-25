describe('Login and Create Functionality', () => {
  let createdEvent;

  before(() => {
    // Log in before running the tests
    cy.login('jv', 'me');
  });

  it('should click "Add New Event" button and render pop-up', () => {
    // Find and click the "Add New Event" button
    cy.get('.new-add-event-button').click();

    // Assert that the pop-up is rendered
    cy.get('.new_pop_up').should('exist');

    // Now, you can perform further interactions within the pop-up as needed
    // For example, select an event type from the dropdown
    cy.get('select').select('Other');

    // Assert that the pop-up is rendered
    cy.get('.event_form').should('exist');

    // Fill in the event form
    const currentDate = new Date().toISOString().split('T')[0];
    const currentTime = new Date().toTimeString().split(' ')[0];

    cy.get('#title').type('New Event Title');
    cy.get('#date').type(currentDate);
    cy.get('#time').type(currentTime);
    cy.get('#description').type('Description for the new event');

    // Save the event
    cy.get('.formButtons button:contains("Save")').click();

    // Assert that the form is closed after saving
    cy.get('.event_form').should('not.exist');

    // Save the event details for later use
    createdEvent = {
      title: 'New Event Title',
      date: currentDate,
      time: currentTime,
      description: 'Description for the new event',
    };

    cy.get('.new-react-calendar').should('exist');

    // Find the React calendar component
    cy.get('.new-react-calendar').as('calendar');


    // Find and click the specific event on the calendar
    cy.get('@calendar').within(() => {
      cy.contains(createdEvent.title).click();
    });

    // Assert that the modal is displayed with the correct event details
    // cy.get('.modal-title').should('contain', `${createdEvent.title} at ${createdEvent.time}`);
    cy.get('.modal-body p').should('contain', createdEvent.description);

    // Click the "Edit" button
    cy.get('.modal-footer button:contains("Edit")').click();

    // Assert that the event form is opened for editing
    cy.get('.event_form').should('exist');

    const updatedTitle = 'Updated Event Title';
    const updatedDescription = 'Updated description for the event';

    cy.get('#title').clear().type(updatedTitle);
    cy.get('#description').clear().type(updatedDescription);

    // Save the changes
    cy.get('.formButtons button:contains("Save")').click();

    // Assert that the form is closed after saving
    cy.get('.event_form').should('not.exist');

    // Verify that the updated details are reflected in the calendar
    cy.get('@calendar').within(() => {
      cy.contains(updatedTitle).click();
    });

    // Assert that the modal is displayed with the correct updated event details
    cy.get('.modal-body p').should('contain', updatedDescription);

    // Click the "Delete" button
    cy.get('.modal-footer button:contains("Delete")').click();

    // Perform verification after deletion
    cy.get('@calendar').within(() => {
      // Assert that the event is no longer present in the calendar
      cy.contains(createdEvent.title).should('not.exist');
    });

    // Now, you might want to check if the event is deleted from the database using your API or other means
    // ...

    // You can also check if the modal is closed after deletion
    cy.get('.modal').should('not.exist');

  });

});




