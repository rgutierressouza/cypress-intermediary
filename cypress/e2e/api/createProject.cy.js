import { Faker, faker } from '@faker-js/faker'

describe('Create project by api', () => {
    beforeEach(() => cy.api_deleteProjects())
    it('Sucefully', () => {
        const project = {
            name: `project-${faker.string.uuid()}`,
            description: faker.lorem.words(5)
        }
        cy.api_createProject(project)
            .then(response => {
                expect(response.status).to.equal(201)
                expect(response.body.name).to.equal(project.name)
                expect(response.body.description).to.equal(project.description)
            })
    })

})