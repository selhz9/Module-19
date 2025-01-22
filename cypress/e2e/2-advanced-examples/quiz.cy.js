describe('Quiz Application E2E Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001/');
  });

  it('should render the Quiz component', () => {
    cy.get('button').contains('Start Quiz').should('be.visible');
  });

  it('should display the start button', () => {
    cy.get('button').contains('Start Quiz').should('be.visible');
  });

  it('should start the quiz when the start button is clicked', () => {
    cy.get('button').contains('Start Quiz').click();
    cy.get('h2').should('be.visible');
  });

  it('should allow answering a question and display the next question', () => {
    cy.get('button').contains('Start Quiz').click();

    cy.get('.btn').first().click();
    cy.get('h2').should('be.visible');
  });

  it('should end the quiz and display the score after all questions are answered', () => {
    cy.get('button').contains('Start Quiz').click();

    const clickThroughQuestions = () => {
      cy.get('h2').then(($question) => {
        if ($question.text().includes('Quiz Completed')) {
          cy.contains('Quiz Completed').should('be.visible');
        } else {
          cy.get('.btn').first().click();
          clickThroughQuestions();
        }
      });
    };

    clickThroughQuestions();

    cy.contains(/Your score: \d+\/\d+/).should('be.visible');
  });

  it('should allow starting a new quiz after finishing the first one', () => {
    cy.get('button').contains('Start Quiz').click();

    const clickThroughQuestions = () => {
      cy.get('h2').then(($question) => {
        if ($question.text().includes('Quiz Completed')) {
          cy.contains('Quiz Completed').should('be.visible');
        } else {
          cy.get('.btn').first().click();
          clickThroughQuestions();
        }
      });
    };

    clickThroughQuestions();

    cy.get('button').contains('Take New Quiz').click();
    cy.get('h2').should('be.visible'); 
    cy.get('.btn').first().should('be.visible'); 
  });
});
