import { Faker, faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } }

describe('create a new project',options, () => {
    beforeEach(() => {
        cy.api_deleteProjects()
        cy.login()
    })
    it('Create a new project successfuly', () => {
        const project = {
            name: `project-${faker.string.uuid()}`,
            description: faker.lorem.words(10)

        }
        cy.gui_createProject(project)

        cy.url().should('be.equal', `${Cypress.config('baseUrl')}/${Cypress.env('user_name')}/${project.name}`)
        cy.contains(project.name).should('be.visible')
        cy.contains(project.description).should('be.visible')
    })

})