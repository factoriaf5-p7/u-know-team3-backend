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
exports.UpdateUserByAdminDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateUserByAdminDto {
}
exports.UpdateUserByAdminDto = UpdateUserByAdminDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", Object)
], UpdateUserByAdminDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'jhon' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserByAdminDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'connors' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserByAdminDto.prototype, "last_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'jhon.connor@judgmentday.com' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UpdateUserByAdminDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '12345' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateUserByAdminDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '100' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateUserByAdminDto.prototype, "wallet_balance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: [] }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UpdateUserByAdminDto.prototype, "bought_courses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['6490c6a365d8d514f7ba7502', '6490640b558ac28e56d30793'] }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UpdateUserByAdminDto.prototype, "created_courses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: [] }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UpdateUserByAdminDto.prototype, "chat_notifications_sent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: [] }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UpdateUserByAdminDto.prototype, "chat_notifications_recieved", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserByAdminDto.prototype, "profile", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'no token los webs' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserByAdminDto.prototype, "recovery_token", void 0);
//# sourceMappingURL=update-user-byadmin.dto%20.js.map