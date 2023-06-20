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
    async create(createUserDto) {
        try {
            const result = await this.userModel.find({ email: createUserDto.email });
            if (result.length !== 0) {
                return { message: 'User already exists' };
            }
            else {
                const result = await this.userModel.create(createUserDto);
                return result;
            }
        }
        catch (e) {
            console.log(`Error creating new user ${e}`);
        }
    }
    findAll() {
        return this.userModel.find();
    }
    async login(user) {
        try {
            const res = await this.userModel.findOne({ email: user.email, password: user.password });
            return res;
        }
        catch (error) {
            console.log(error);
        }
    }
    async saveRecoverPassword(token, user) {
        try {
            const updatedUser = await this.userModel.findById(user._id);
            updatedUser.recovery_token = token;
            return await updatedUser.save();
        }
        catch (error) {
        }
    }
    findOne(id) {
        return 'findone';
    }
    async update(user) {
        try {
            const result = await this.userModel.findOneAndUpdate({ _id: user._id }, Object.assign({}, user));
            console.log(result);
            return result;
        }
        catch (error) {
            console.log(error);
        }
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
};
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map