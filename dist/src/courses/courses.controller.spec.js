"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const courses_controller_1 = require("./courses.controller");
const courses_service_1 = require("./courses.service");
describe('CoursesController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [courses_controller_1.CoursesController],
            providers: [courses_service_1.CoursesService],
        }).compile();
        controller = module.get(courses_controller_1.CoursesController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=courses.controller.spec.js.map