"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const courses_service_1 = require("./courses.service");
describe('CoursesService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [courses_service_1.CoursesService],
        }).compile();
        service = module.get(courses_service_1.CoursesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=courses.service.spec.js.map