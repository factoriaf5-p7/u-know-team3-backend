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
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
let User = exports.User = class User {
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Jhon' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Connor' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "last_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'jhon.connor@judgmentday.com' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '12345' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100 }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], User.prototype, "wallet_balance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['Bought Course 1', 'Bought Course 2'] }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], User.prototype, "bought_courses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['Created Course 1', 'Created Course 2'] }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], User.prototype, "created_courses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: [{ sent_to_user: 1, sent_date: '2023-06-20 10:30' }, { sent_to_user: 5, sent_date: '2023-06-23 17:00' }] }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], User.prototype, "chat_notifications_sent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: [{ recieved_from_user: 1, requested_date: '2023-06-20 10:30' }, { recieved_from_user: 5, requested_date: '2023-06-23 17:00' }] }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], User.prototype, "chat_notifications_recieved", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user | admin' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "profile", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '4j4jllleu99xaey21' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "recovery_token", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)({ typeKey: '$type' })
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.schema.js.map