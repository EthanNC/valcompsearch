it('Basic Search', () => {
    // Load "http://localhost:3000/"
    cy.visit('http://localhost:3000/')
  
    // Resize window to 1792 x 1010
    cy.viewport(1792, 1010)
  
    // Click on <div> "Astra"
    cy.get('.mantine-UnstyledButton-root > #Astra').click()
  
    // Click on <div> "Brimstone"
    cy.get('.mantine-UnstyledButton-root > #Brimstone').click()
  
    // Click on <div> "Omen"
    cy.get('.mantine-UnstyledButton-root > #Omen').click()
  
    // Click on <svg> .mantine-1ql2kyp:nth-child(2) > svg
    cy.get('.mantine-1ql2kyp:nth-child(2) > svg').click()
  
    // Click on <span> "Submit"
    cy.get('.mantine-qo1k2').click()
})