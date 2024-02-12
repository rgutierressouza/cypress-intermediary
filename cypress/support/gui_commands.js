import { faker } from "@faker-js/faker"

Cypress.Commands.add('login', (
    user = Cypress.env('user_name'),
    password = Cypress.env('user_password'),
    { cacheSession = true } = {},
) => {
    const login = () => {
        cy.visit('/users/sign_in')

        cy.get("[data-qa-selector='login_field']").type(user)
        cy.get("[data-qa-selector='password_field']").type(password, { log: false })
        cy.get("[data-qa-selector='sign_in_button']").click()
    }
    // Visita a página HTMLModElement, utilizando a função cy.location usando o pathname para verificar se o pathname é != de '/users/sign_in"
    // Se o location não for igual á /users/sign_in, é restaurada a sessão existente, senão faz novamente a função de login
    const validate = () => {
        cy.visit('/')
        cy.location('pathname', { timeout: 1000 })
            .should('not.eq', '/users/sign_in')
    }

    const options = {
        cacheAcrossSpecs: true,
        validate,
    }

    if (cacheSession) {
        cy.session(user, login, options)
    } else {
        login()
    }
})

Cypress.Commands.add('logout', () => {
    cy.get(".qa-user-avatar").click()
    cy.get("[data-qa-selector='sign_out_link']").click()
})

Cypress.Commands.add('gui_createProject', project => {
    //Vai direto para a url de criação
    cy.visit('/projects/new')

    cy.get('#project_name').type(project.name)
    cy.get('#project_description').type(project.description)
    cy.get('.qa-initialize-with-readme-checkbox').check()
    cy.contains('Create project').click()
})

Cypress.Commands.add('gui_createIssue', issue => {
    cy.visit(`/${Cypress.env('user_name')}/${issue.project.name}/issues/new`)
  
    cy.get('.qa-issuable-form-title').type(issue.title)
    cy.get('.qa-issuable-form-description').type(issue.description)
    cy.contains('Submit issue').click()
  })

Cypress.Commands.add('gui_setLabelOnIssue', label =>{
    cy.get('.qa-edit-link-labels').click()
    cy.contains(label.name).click()
    cy.get('body').click()
})

Cypress.Commands.add('gui_setMilestonesOnIssue', milestone =>{
    cy.get('.block.milestone .edit-link').click()
    cy.contains(milestone.title).click()
})