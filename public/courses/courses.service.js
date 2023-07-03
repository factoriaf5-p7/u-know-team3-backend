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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const course_schema_1 = require("./schemas/course.schema");
const mongoose_2 = require("mongoose");
const users_service_1 = require("../users/users.service");
let CoursesService = exports.CoursesService = class CoursesService {
    prototype(prototype, arg1) {
        throw new Error('Method not implemented.');
    }
    constructor(userService, courseModel) {
        this.userService = userService;
        this.courseModel = courseModel;
    }
    async create(userId, createCourseDto) {
        try {
            const newCourse = await this.courseModel.create(createCourseDto);
            this.userService.addCreatedCourse(userId, newCourse._id);
            return {
                message: 'New course created successfully.',
                status: common_1.HttpStatus.OK,
                data: newCourse,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async findAll() {
        try {
            const allCourses = await this.courseModel.find();
            return {
                message: 'All courses retrieved successfully',
                status: common_1.HttpStatus.OK,
                data: allCourses,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async findBoughtCourses(id) {
        try {
            const { message, status, data } = await this.userService.findOneWithBoughtCourses(id);
            const boughtCourses = [];
            const entries = Object.entries(data.bought_courses);
            console.log(entries);
            entries.forEach(course => {
                boughtCourses.push({ _id: course[1].course_id['_id'], name: course[1].course_id.name });
            });
            return {
                message: 'Retrieved all courses purchased by user successfully',
                status: common_1.HttpStatus.OK,
                data: boughtCourses
            };
        }
        catch (error) {
            throw error;
        }
    }
    async addRating(userId, ratedCourse) {
        try {
            const { data, message, status } = await this.userService.addRating(userId, ratedCourse);
            return {
                message: 'Course rated successfully',
                status: common_1.HttpStatus.OK,
                data: data,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async searchAdmin(filters, keywords) {
        var _a, e_1, _b, _c;
        try {
            let allCourses = [];
            const arrFilters = filters.split(',');
            let regex;
            try {
                for (var _d = true, arrFilters_1 = __asyncValues(arrFilters), arrFilters_1_1; arrFilters_1_1 = await arrFilters_1.next(), _a = arrFilters_1_1.done, !_a; _d = true) {
                    _c = arrFilters_1_1.value;
                    _d = false;
                    const filter = _c;
                    if (filter !== 'price') {
                        regex = new RegExp(keywords, 'i');
                    }
                    else if (!isNaN(+keywords)) {
                        regex = +keywords;
                    }
                    allCourses.push(...await this.courseModel.find({ [filter]: regex }));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = arrFilters_1.return)) await _b.call(arrFilters_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            allCourses = allCourses.flat(Infinity);
            const hash = {};
            const filteredCourses = allCourses.filter(course => {
                return hash[course._id] ? false : hash[course._id] = true;
            });
            return {
                message: 'Retrieved filtered courses successfully',
                status: common_1.HttpStatus.OK,
                data: filteredCourses
            };
        }
        catch (error) {
            throw error;
        }
    }
    async findAllSortedByAverage() {
        const calculates = [];
        const idCoursesAll = await this.courseModel.find({}, { _id: 1, name: 1 });
        const { data, message, status } = await this.userService.findAllBoughtCourses({}, { bought_courses: 1, _id: 0 });
        idCoursesAll.forEach((course) => {
            const courseId = course._id;
            let totalStars = 0;
            let numRating = 0;
            data.forEach((boughtCourses) => {
                const bcourses = Array.from(boughtCourses.bought_courses);
                bcourses.forEach((courseObj) => {
                    if (String(courseObj.course_id) === String(courseId)) {
                        totalStars += courseObj.stars;
                        numRating++;
                    }
                });
            });
            calculates.push({
                _id: courseId,
                name: course.name,
                totalStars,
                numRating,
            });
        });
        const hash = {};
        const filteredCourses = calculates.filter((course) => {
            return hash[course._id] || course.numRating === 0
                ? false
                : (hash[course._id] = true);
        });
        filteredCourses.map((course) => {
            if (course.numRating > 0) {
                course.average = course.totalStars / course.numRating;
                return Number(course.average.toFixed(2));
            }
        });
        const sortedCourses = filteredCourses.sort((a, b) => b.average - a.average);
        return {
            message: 'Retrieved all courses succesfully',
            status: 200,
            data: sortedCourses,
        };
    }
    async findCreatedCourses(userId) {
        const { data, message, status } = await this.userService.findOneWithCreatedCourses(userId);
        const createdCourses = [];
        const entries = Object.entries(data.created_courses);
        entries.forEach((course) => {
            createdCourses.push({ _id: course[1]._id, name: course[1].name });
        });
        return {
            message: 'Retrieved all created courses successfully',
            status: common_1.HttpStatus.OK,
            data: createdCourses,
        };
    }
    async findCoursesCollectionById(courseId) {
        return await Promise.all(courseId.map(async (courseId) => await this.courseModel.findById(courseId)));
    }
    async search(filters, keywords) {
        var _a, e_2, _b, _c;
        try {
            let allCourses = [];
            let regex;
            const arrFilters = filters.split(',');
            try {
                for (var _d = true, arrFilters_2 = __asyncValues(arrFilters), arrFilters_2_1; arrFilters_2_1 = await arrFilters_2.next(), _a = arrFilters_2_1.done, !_a; _d = true) {
                    _c = arrFilters_2_1.value;
                    _d = false;
                    const filter = _c;
                    if (filter !== 'price') {
                        regex = new RegExp(keywords, 'i');
                    }
                    else if (!isNaN(+keywords)) {
                        regex = +keywords;
                    }
                    allCourses.push(...await this.courseModel.find({ [filter]: regex }).select('_id name'));
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = arrFilters_2.return)) await _b.call(arrFilters_2);
                }
                finally { if (e_2) throw e_2.error; }
            }
            allCourses = allCourses.flat(Infinity);
            const hash = {};
            const filteredCourses = allCourses.filter((course) => {
                return hash[course._id] ? false : (hash[course._id] = true);
            });
            return {
                message: 'Retrieved filtered courses successfully',
                status: common_1.HttpStatus.OK,
                data: filteredCourses,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(id) {
        try {
            const course = await this.courseModel.findById(id);
            return {
                message: 'Course retrieved successfully',
                status: common_1.HttpStatus.OK,
                data: course,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async findOneAdmin(id) {
        try {
            const course = await this.courseModel.findById(id);
            return {
                message: 'Course retrieved successfully',
                status: common_1.HttpStatus.OK,
                data: course
            };
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, updateCourse) {
        try {
            const { data, message, status } = await this.userService.findOne(id);
            const entries = Object.entries(data.created_courses);
            let courseUpdated;
            entries.forEach(async (course) => {
                console.log(course[1]._id);
                if (String(updateCourse._id) === String(course[1]._id)) {
                    console.log('actualizando');
                    courseUpdated = await this.courseModel.findOneAndUpdate({ _id: updateCourse._id }, Object.assign({}, updateCourse));
                }
                else {
                    throw new Error('Course not found');
                }
            });
            return {
                message: 'Course updated successfully',
                status: common_1.HttpStatus.OK,
                data: courseUpdated,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async deleteCourse(id) {
        try {
            const course = await this.courseModel.findOne({ _id: id });
            if (course) {
                if (course.bought)
                    throw new common_1.HttpException('Course cannot be deleted.', common_1.HttpStatus.UNAUTHORIZED);
                await this.courseModel.deleteOne({ _id: id });
                return {
                    message: 'Course deleted.',
                    status: common_1.HttpStatus.OK,
                    data: '',
                };
            }
            else {
                throw new common_1.HttpException('Course not found.', common_1.HttpStatus.NOT_FOUND);
            }
        }
        catch (error) {
            throw error;
        }
    }
    async findAllSortedByPriceDesc() {
        try {
            const coursesByPrice = await this.courseModel.find().sort({ price: -1 });
            return {
                message: 'All courses retrieved successfully',
                status: common_1.HttpStatus.OK,
                data: coursesByPrice,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async deleteCourseByAdmin(id) {
        try {
            const course = await this.courseModel.findOne({ _id: id });
            if (course) {
                await this.courseModel.deleteOne({ _id: id });
                return {
                    message: 'Course deleted by admin',
                    status: common_1.HttpStatus.OK,
                    data: '',
                };
            }
            else {
                throw new common_1.HttpException('Course not found.', common_1.HttpStatus.NOT_FOUND);
            }
        }
        catch (error) {
            throw error;
        }
    }
    async purchaseCourse(purchaseCourseDto) {
        try {
            const user = (await this.userService.findOne(purchaseCourseDto.userId)).data;
            const course = await this.courseModel.findOne({ _id: purchaseCourseDto.courseId });
            if (user.wallet_balance < course.price) {
                throw new common_1.HttpException('INSUFFICIENT_BALANCE', common_1.HttpStatus.FORBIDDEN);
            }
            else {
                if (!course.bought) {
                    await this.courseModel.findOneAndUpdate({ _id: course._id }, { bought: true });
                }
                user.wallet_balance -= course.price;
                const object = {
                    course_id: course.id,
                    stars: 0,
                    commented: false
                };
                await this.userService.updateUserBoughtCourses(user._id, object);
                return {
                    message: 'Course purchased.',
                    status: common_1.HttpStatus.OK,
                    data: ''
                };
            }
        }
        catch (error) {
            throw error;
        }
    }
};
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(course_schema_1.Course.name)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        mongoose_2.Model])
], CoursesService);
//# sourceMappingURL=courses.service.js.map