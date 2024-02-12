import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } }

describe('Create a new milestones for issue', options, () => {
    const milestone = {
        title:  `milestone-${faker.lorem.words(3)}`,
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
                cy.api_createMilestone(response.body.project_id, milestone)
                cy.visit(`${Cypress.env('user_name')}/${issue.project.name}/issues/${response.body.iid}`)
            })
    })

    it('Create a new label', () => {
        cy.gui_setMilestonesOnIssue(milestone)
        cy.get('.block.milestone').should('contain', milestone.title)
    })
})