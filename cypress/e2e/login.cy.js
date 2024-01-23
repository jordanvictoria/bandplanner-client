describe('Login Functionality', () => {
    it('should log in successfully', () => {
        const testUser = {
            username: 'jv',
            password: 'me',
        };

        cy.request({
            method: 'POST',
            url: 'http://localhost:8000/login',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: {
                username: testUser.username,
                password: testUser.password,
            },
        }).then((response) => {
            expect(response.status).to.equal(200);

            // Extract the auth token based on your actual backend response structure
            const authToken = response.body.token;

            // Save the auth token for future requests
            cy.wrap(authToken).as('authToken');

            // Visit the login page
            cy.visit('/');
            cy.log('Visited login page');

            // Perform login actions using the auth token
      
            
            cy.get('input[name="username"]').type(testUser.username);
            cy.get('input[name="password"]').type(testUser.password);
            cy.get('button[type="submit"]').click();

            // Assert that the user is redirected to the homepage after successful login
            cy.url().should('eq', 'http://localhost:3000/');
        });
    });
});



// // Cypress test
// it('should perform CRUD operations without affecting the database', () => {
//     // Begin a transaction
//     cy.task('beginTransaction');
  
//     // Perform CRUD operations using Cypress commands
  
//     // Roll back the transaction
//     cy.task('rollbackTransaction');
//   });
  


