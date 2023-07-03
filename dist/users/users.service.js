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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
let UsersService = exports.UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(user) {
        try {
            const result = await this.userModel.find({ email: user.email });
            if (result.length !== 0) {
                return { message: 'User already exists' };
            }
            else {
                await this.userModel.create(user);
                return {
                    message: 'User created succesfully',
                    status: 200,
                    data: ''
                };
            }
        }
        catch (error) {
            throw error;
        }
    }
    async addCreatedCourse(userId, courseId) {
        try {
            await this.userModel.findOneAndUpdate({ _id: userId }, { $push: { created_courses: courseId } });
            return {
                message: 'Created course added successfully',
                status: common_1.HttpStatus.OK,
                data: ''
            };
        }
        catch (error) {
            throw error;
        }
    }
    async findAll() {
        try {
            const users = await this.userModel.find().select('-password').lean().exec();
            return {
                message: 'All users retrieved succesfully',
                status: 200,
                users: users
            };
        }
        catch (error) {
            throw error;
        }
    }
    async findAllAdmin() {
        try {
            const users = await this.userModel.find();
            return {
                message: 'All users retrieved succesfully',
                status: 200,
                data: users
            };
        }
        catch (error) {
            throw error;
        }
    }
    async findOneLogin(email) {
        return await this.userModel.findOne({ email });
    }
    async findOne(id) {
        try {
            const user = await this.userModel.findOne({ _id: id }).select('-password -recovery_token');
            return {
                message: 'User retrived successfully',
                status: 200,
                data: user
            };
        }
        catch (error) {
            throw error;
        }
    }
    async findOneWithCreatedCourses(id) {
        try {
            const createdCourses = await this.userModel.findOne({ _id: id }).select('created_courses').populate('created_courses');
            return {
                message: 'User with created courses retrived successfully',
                status: 200,
                data: createdCourses
            };
        }
        catch (error) {
            throw error;
        }
    }
    async findOneWithBoughtCourses(id) {
        try {
            const boughtCourses = await this.userModel.findOne({ _id: id }, { bought_courses: 1 }).populate('bought_courses.course_id');
            return {
                message: 'User with bought courses retrived successfully',
                status: 200,
                data: boughtCourses
            };
        }
        catch (error) {
            throw error;
        }
    }
    async update(user) {
        try {
            const updatedUser = await this.userModel.findOneAndUpdate({ _id: user._id }, Object.assign({}, user));
            return {
                message: 'User updated successfully',
                status: 200,
                data: updatedUser
            };
        }
        catch (error) {
            throw error;
        }
    }
    async updatePassword(user) {
        try {
            await this.userModel.findOneAndUpdate({ _id: user._id }, Object.assign({}, user)).select('-password -recovery_token');
            return {
                message: 'Password updated successfully',
                status: 200,
                data: ''
            };
        }
        catch (error) {
            throw error;
        }
    }
    async updateRecoveryToken(user) {
        try {
            const userTokenCreated = await this.userModel.findOneAndUpdate({ _id: user._id }, Object.assign({}, user));
            return {
                message: 'Recovery token created successfully',
                status: 200,
                data: userTokenCreated
            };
        }
        catch (error) {
            throw error;
        }
    }
    async findAllBoughtCourses(user, filter) {
        try {
            const usersBoughtCourses = await this.userModel.find(user, filter).lean().exec();
            return {
                message: 'All users retrieved succesfully',
                status: 200,
                data: usersBoughtCourses
            };
        }
        catch (error) {
            throw error;
        }
    }
    async deleteUserByAdmin(id) {
        try {
            const findUser = await this.userModel.findByIdAndDelete(id);
            if (!findUser)
                throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
            return {
                message: 'User deleted by Admin',
                status: common_1.HttpStatus.OK,
                data: ''
            };
        }
        catch (error) {
            throw error;
        }
    }
    async addRating(userId, ratedCourse) {
        try {
            const updatedUser = await this.userModel.findOneAndUpdate({ 'bought_courses.course_id': ratedCourse._id }, {
                'bought_courses.$.stars': ratedCourse.stars
            }).select('bought_courses');
            return {
                message: 'Course rated successfully',
                status: common_1.HttpStatus.OK,
                data: updatedUser.bought_courses
            };
        }
        catch (error) {
            throw error;
        }
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
    async updateUserBoughtCourses(userId, course) {
        const update = {
            $push: {
                bought_courses: {
                    course_id: course.id,
                    stars: 0,
                    commented: false,
                },
            },
        };
        return this.userModel.findOneAndUpdate(userId, update);
    }
};
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map