import { mount } from 'cypress/react18'; 
import Quiz from '../../client/src/components/Quiz';

describe('<Quiz /> Component', () => {
  it('should render the Quiz component', () => {
    mount(<Quiz />);
  });

  it('should display the start button', () => {
    mount(<Quiz />);
    cy.get('button').contains('Start').should('be.visible');
  });

  it('should start the quiz when the start button is clicked', () => {
    mount(<Quiz />);
    cy.get('button').contains('Start').click();

    cy.get('.spinner-border').should('not.exist'); 
    cy.get('h2').should('be.visible');  
  });

  it('should allow answering a question and display the next question', () => {
    mount(<Quiz />);
    cy.get('button').contains('Start').click();

    cy.get('.spinner-border').should('not.exist'); 
    cy.get('h2').should('be.visible'); 

    cy.get('button.btn').first().click();

    cy.get('h2').should('not.contain', 'Question 1'); 
  });

  it('should end the quiz and display the score after all questions are answered', () => {
    mount(<Quiz />);
    cy.get('button').contains('Start').click();

    cy.get('.spinner-border').should('not.exist');
    cy.get('h2').should('be.visible');

    for (let i = 0; i < 10; i++) {
      cy.get('button.btn').first().click();
      cy.get('h2').should('not.contain', `Question ${i + 1}`);  
    }

    cy.get('.alert.alert-success').should('be.visible');
  });

  it('should allow starting a new quiz after finishing the first one', () => {
    mount(<Quiz />);
    cy.get('button').contains('Start').click();

    for (let i = 0; i < 10; i++) {
      cy.get('button.btn').first().click();
    }

    cy.get('.alert.alert-success').should('be.visible');

    cy.get('button').contains('Take New Quiz').click();
    cy.get('h2').should('be.visible'); 
  });
});
