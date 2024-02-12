import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } }

describe('Create a new label for issue', options, () => {
    const label = {
        name:  'BUG',
        color: '#EB702B'
    }

    const issue = {
        title: `issue-${faker.datatype.uuid()}`,
        description: faker.lorem.words(3),
        project: {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.lorem.words(5)
        }
    }

    beforeEach(() => {
        cy.api_deleteProjects()
        cy.login()
        cy.api_createIssue(issue)
            .then(response => {
                cy.api_createLabel(response.body.project_id, label)
                cy.visit(`${Cypress.env('user_name')}/${issue.project.name}/issues/${response.body.iid}`)
            })
    })

    it('Create a new label', () => {
        cy.gui_setLabelOnIssue(label)
        
        cy.get('.qa-labels-block').should('contain', label.name)
        cy.get('.qa-labels-block span')
          .should('have.attr', 'style', `background-color: ${label.color}; color: #FFFFFF;`)
    })
})