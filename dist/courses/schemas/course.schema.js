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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseSchema = exports.Course = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
let Course = exports.Course = class Course {
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Introduction to Web Development' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Course.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 59.99 }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Course.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Web Development' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Course.prototype, "topic", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Beginner' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Course.prototype, "difficulty", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['HTML', 'CSS', 'JavaScript'] }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Course.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: [{
                stars: 4
            },
            {
                stars: 5
            }] }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Course.prototype, "reviews", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '# Introduction to Web Development\n\nWelcome to the Introduction to Web Development course! In this course, you will learn the fundamentals of web development using HTML, CSS, and JavaScript.\n\n## Course Outline\n\n### Chapter 1: HTML Basics\n\nIn this chapter, we will cover the following topics:\n\n- Introduction to HTML\n- HTML tags and elements\n- Building a basic HTML webpage\n\n### Chapter 2: CSS Styling\n\nIn this chapter, we will cover the following topics:\n\n- Introduction to CSS\n- Selectors and properties\n- Applying styles to HTML elements\n\n### Chapter 3: JavaScript Fundamentals\n\nIn this chapter, we will cover the following topics:\n\n- Introduction to JavaScript\n- Variables and data types\n- Control flow and functions\n\n## Conclusion\n\nCongratulations on completing the Introduction to Web Development course! We hope you\'ve gained a solid foundation in web development.' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Course.prototype, "content", void 0);
exports.Course = Course = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Course);
exports.CourseSchema = mongoose_1.SchemaFactory.createForClass(Course);
//# sourceMappingURL=course.schema.js.map