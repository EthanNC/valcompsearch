it('Filter results by map', () => {
    // Load "http://localhost:3000/results?team=astra+viper+jett&order="
    cy.visit('http://localhost:3000/results?team=astra+viper+jett&order=')
  
    // Resize window to 1792 x 1010
    cy.viewport(1792, 1010)
  
    // Fill "bind" on <select> #mapSelect
    cy.get('#mapSelect').select('bind')
  
    // Click on <select> #mapSelect
    
  
    // Fill "split" on <select> #mapSelect
    cy.get('#mapSelect').select('split')
  
    // Click on <select> #mapSelect
    
  
    // Fill "all" on <select> #mapSelect
    cy.get('#mapSelect').select('all')
  })


  it('Order by ascending and descending', () => {
    // Load "http://localhost:3000/results?team=astra+viper+jett&order="
    cy.visit('http://localhost:3000/results?team=astra+viper+jett&order=')
  
    // Resize window to 1792 x 1010
    cy.viewport(1792, 1010)
  
    // Fill "Oldest" on <select> #orderSelect
    cy.get('#orderSelect').select('Oldest')
  
    // Scroll wheel by X:0, Y:3
    cy.scrollTo(0, 1)
  
    // Scroll wheel by X:-1, Y:2
    cy.scrollTo(0, 3)
  
    // Scroll wheel by X:0, Y:54
    cy.scrollTo(0, 35)
  
    // Scroll wheel by X:-9, Y:149
    cy.scrollTo(0, 189)
  
    // Scroll wheel by X:0, Y:640
    cy.scrollTo(0, 844)
  
    // Scroll wheel by X:-5, Y:43
    cy.scrollTo(0, 883)
  
    // Scroll wheel by X:0, Y:143
    cy.scrollTo(0, 1005)
  
    // Fill "Oldest" on <select> #orderSelect
    cy.get('#orderSelect').select('Oldest')
  
    // Scroll wheel by X:0, Y:-1
    cy.scrollTo(0, 916)
  
    // Scroll wheel by X:-8, Y:-85
    cy.scrollTo(0, 832)
  
    // Scroll wheel by X:0, Y:-629
    cy.scrollTo(0, 183)
  
    // Scroll wheel by X:-9, Y:-53
    cy.scrollTo(0, 147)
  
    // Scroll wheel by X:0, Y:-253
    cy.scrollTo(0, 0)
  
    // Fill "Newest" on <select> #orderSelect
    cy.get('#orderSelect').select('Newest')
  })