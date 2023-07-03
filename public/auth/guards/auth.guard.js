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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let AuthGuard = exports.AuthGuard = class AuthGuard {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = this._extractTokenFromHeader(request);
        if (!token)
            throw new Error('No token in request');
        try {
            const payload = await this.jwtService.verifyAsync(token, { secret: 'Th3 s3cr3t t0 k33p s4v3 t0k3ns 4nd s3rv3r' });
            request['user'] = payload;
            return true;
        }
        catch (error) {
            throw new common_1.UnauthorizedException();
        }
    }
    _extractTokenFromHeader(req) {
        try {
            const [type, token] = req.headers.authorization.split(' ');
            return type === 'Bearer' ? token : undefined;
        }
        catch (error) {
            throw new common_1.UnauthorizedException();
        }
    }
};
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map