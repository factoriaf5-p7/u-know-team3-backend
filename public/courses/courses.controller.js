"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesController = void 0;
const common_1 = require("@nestjs/common");
const courses_service_1 = require("./courses.service");
const create_course_dto_1 = require("./dto/create-course.dto");
const update_course_dto_1 = require("./dto/update-course.dto");
const rate_course_dto_1 = require("./dto/rate-course.dto");
const buy_course_dto_1 = require("./dto/buy-course.dto");
const roles_1 = require("../auth/guards/roles");
const roles_enum_1 = require("../auth/guards/roles.enum");
const role_guard_1 = require("../auth/guards/role.guard");
let CoursesController = exports.CoursesController = class CoursesController {
    constructor(coursesService) {
        this.coursesService = coursesService;
    }
    create(userId, createCourseDto) {
        return this.coursesService.create(userId, createCourseDto);
    }
    showCreatedCourses(userId) {
        return this.coursesService.findCreatedCourses(userId);
    }
    findAllSortedByAverage() {
        return this.coursesService.findAllSortedByAverage();
    }
    findAllSortedByPriceDesc() {
        return this.coursesService.findAllSortedByPriceDesc();
    }
    findAll() {
        return this.coursesService.findAll();
    }
    findBoughtCourses(userId) {
        return this.coursesService.findBoughtCourses(userId);
    }
    search(query) {
        return this.coursesService.search(query.filters, query.keywords);
    }
    searchAdmin(query) {
        return this.coursesService.searchAdmin(query.filters, query.keywords);
    }
    findOne(id) {
        return this.coursesService.findOne(id);
    }
    purchaseCourse(purchaseCourseDto) {
        return this.coursesService.purchaseCourse(purchaseCourseDto);
    }
    findOneAdmin(id) {
        return this.coursesService.findOneAdmin(id);
    }
    update(userId, updateCourseDto) {
        return this.coursesService.update(userId, updateCourseDto);
    }
    deleteCourse(id) {
        return this.coursesService.deleteCourse(id);
    }
    deleteCourseByAdmin(id) {
        return this.coursesService.deleteCourseByAdmin(id);
    }
    addRating(userId, ratedCourse) {
        return this.coursesService.addRating(userId, ratedCourse);
    }
};
__decorate([
    (0, common_1.Post)('create/:userid'),
    __param(0, (0, common_1.Param)('userid')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_course_dto_1.CreateCourseDto]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('created-courses/:userid'),
    __param(0, (0, common_1.Param)('userid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "showCreatedCourses", null);
__decorate([
    (0, common_1.Get)('average'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "findAllSortedByAverage", null);
__decorate([
    (0, common_1.Get)('order-courses-price'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "findAllSortedByPriceDesc", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('bought-courses/:userid'),
    __param(0, (0, common_1.Param)('userid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "findBoughtCourses", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('search/admin'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "searchAdmin", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('purchase'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [buy_course_dto_1.PurchaseCourseDto]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "purchaseCourse", null);
__decorate([
    (0, common_1.Get)('admin/:id'),
    (0, roles_1.Roles)(roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "findOneAdmin", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_course_dto_1.UpdateCourseDto]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "deleteCourse", null);
__decorate([
    (0, common_1.Delete)('admin/delete'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "deleteCourseByAdmin", null);
__decorate([
    (0, common_1.Patch)('rating/:userid'),
    __param(0, (0, common_1.Param)('userid')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, rate_course_dto_1.RatedCourseDto]),
    __metadata("design:returntype", void 0)
], CoursesController.prototype, "addRating", null);
exports.CoursesController = CoursesController = __decorate([
    (0, common_1.Controller)('courses'),
    __metadata("design:paramtypes", [courses_service_1.CoursesService])
], CoursesController);
//# sourceMappingURL=courses.controller.js.map