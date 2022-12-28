/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/api/src/app/app.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const app_service_1 = __webpack_require__("./apps/api/src/app/app.service.ts");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getData() {
        return this.appService.getData();
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "getData", null);
AppController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);
exports.AppController = AppController;


/***/ }),

/***/ "./apps/api/src/app/app.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const config_1 = __webpack_require__("@nestjs/config");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const event_emitter_1 = __webpack_require__("@nestjs/event-emitter");
const app_controller_1 = __webpack_require__("./apps/api/src/app/app.controller.ts");
const app_service_1 = __webpack_require__("./apps/api/src/app/app.service.ts");
const users_module_1 = __webpack_require__("./apps/api/src/app/users/users.module.ts");
const news_module_1 = __webpack_require__("./apps/api/src/app/news/news.module.ts");
const categories_module_1 = __webpack_require__("./apps/api/src/app/categories/categories.module.ts");
const comments_module_1 = __webpack_require__("./apps/api/src/app/comments/comments.module.ts");
const entities_1 = __webpack_require__("./libs/entities/src/index.ts");
const auth_module_1 = __webpack_require__("./apps/api/src/app/auth/auth.module.ts");
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT),
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                entities: [entities_1.UserEntity, entities_1.NewsEntity, entities_1.CategoryEntity, entities_1.CommentEntity],
                synchronize: false,
            }),
            event_emitter_1.EventEmitterModule.forRoot({
                wildcard: true,
            }),
            users_module_1.UsersModule,
            news_module_1.NewsModule,
            categories_module_1.CategoriesModule,
            comments_module_1.CommentsModule,
            auth_module_1.AuthModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./apps/api/src/app/app.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
let AppService = class AppService {
    getData() {
        return { message: 'Welcome to api!' };
    }
};
AppService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;


/***/ }),

/***/ "./apps/api/src/app/auth/auth.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const local_auth_guard_1 = __webpack_require__("./apps/api/src/app/auth/local-auth.guard.ts");
const jwt_auth_guard_1 = __webpack_require__("./apps/api/src/app/auth/jwt-auth.guard.ts");
const auth_service_1 = __webpack_require__("./apps/api/src/app/auth/auth.service.ts");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    getCurrentUser(req) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { userId } = req.user;
            if (!userId) {
                return null;
            }
            return this.authService.getCurrentUser(userId);
        });
    }
    login(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { access_token } = yield this.authService.login(req.user);
            res.setHeader('Set-Cookie', `token=${access_token}; Max-Age=${parseInt(process.env.JWT_EXPIRESIN_SEC)}; Path=/`);
            return req.user;
        });
    }
};
tslib_1.__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('session'),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "getCurrentUser", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('session'),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__param(1, (0, common_1.Response)({ passthrough: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
AuthController = tslib_1.__decorate([
    (0, common_1.Controller)('auth'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);
exports.AuthController = AuthController;


/***/ }),

/***/ "./apps/api/src/app/auth/auth.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const passport_1 = __webpack_require__("@nestjs/passport");
const dist_1 = __webpack_require__("@nestjs/jwt/dist");
const auth_controller_1 = __webpack_require__("./apps/api/src/app/auth/auth.controller.ts");
const auth_service_1 = __webpack_require__("./apps/api/src/app/auth/auth.service.ts");
const users_module_1 = __webpack_require__("./apps/api/src/app/users/users.module.ts");
const local_strategy_1 = __webpack_require__("./apps/api/src/app/auth/local.strategy.ts");
const jwt_strategy_1 = __webpack_require__("./apps/api/src/app/auth/jwt.strategy.ts");
let AuthModule = class AuthModule {
};
AuthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            passport_1.PassportModule,
            dist_1.JwtModule.registerAsync({
                useFactory: () => ({
                    secret: process.env.JWT_SECRET,
                    signOptions: {
                        expiresIn: parseInt(process.env.JWT_EXPIRESIN_SEC) * 1000,
                    },
                }),
            }),
        ],
        providers: [auth_service_1.AuthService, local_strategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy],
        controllers: [auth_controller_1.AuthController],
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ }),

/***/ "./apps/api/src/app/auth/auth.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const users_service_1 = __webpack_require__("./apps/api/src/app/users/users.service.ts");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    validateUser(email, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersService.findByEmail(email);
            if (user && user.password === password) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { password } = user, result = tslib_1.__rest(user, ["password"]);
                return result;
            }
            return null;
        });
    }
    login(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const payload = {
                username: user.email,
                role: user.role,
                sub: user.id,
            };
            return {
                access_token: this.jwtService.sign(payload),
            };
        });
    }
    getCurrentUser(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersService.findById(userId);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password } = user, result = tslib_1.__rest(user, ["password"]);
            return result;
        });
    }
};
AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], AuthService);
exports.AuthService = AuthService;


/***/ }),

/***/ "./apps/api/src/app/auth/jwt-auth.guard.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const passport_1 = __webpack_require__("@nestjs/passport");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
};
JwtAuthGuard = tslib_1.__decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);
exports.JwtAuthGuard = JwtAuthGuard;


/***/ }),

/***/ "./apps/api/src/app/auth/jwt.strategy.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var JwtStrategy_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const passport_1 = __webpack_require__("@nestjs/passport");
const passport_jwt_1 = __webpack_require__("passport-jwt");
let JwtStrategy = JwtStrategy_1 = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                JwtStrategy_1.extractJWT,
                passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }
    validate(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // console.log('JwtStrategy -> validate -> payload', payload);
            return {
                userId: payload.sub,
                username: payload.username,
                role: payload.role,
            };
        });
    }
    static extractJWT(req) {
        if (req.cookies && 'token' in req.cookies && req.cookies.token.length > 0) {
            return req.cookies.token;
        }
        return null;
    }
};
JwtStrategy = JwtStrategy_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;


/***/ }),

/***/ "./apps/api/src/app/auth/local-auth.guard.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalAuthGuard = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const passport_1 = __webpack_require__("@nestjs/passport");
let LocalAuthGuard = class LocalAuthGuard extends (0, passport_1.AuthGuard)('local') {
};
LocalAuthGuard = tslib_1.__decorate([
    (0, common_1.Injectable)()
], LocalAuthGuard);
exports.LocalAuthGuard = LocalAuthGuard;


/***/ }),

/***/ "./apps/api/src/app/auth/local.strategy.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalStrategy = void 0;
const tslib_1 = __webpack_require__("tslib");
const passport_local_1 = __webpack_require__("passport-local");
const passport_1 = __webpack_require__("@nestjs/passport");
const common_1 = __webpack_require__("@nestjs/common");
const auth_service_1 = __webpack_require__("./apps/api/src/app/auth/auth.service.ts");
let LocalStrategy = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor(authService) {
        super({ usernameField: 'email' });
        this.authService = authService;
    }
    validate(email, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.authService.validateUser(email, password);
            if (!user) {
                throw new common_1.UnauthorizedException();
            }
            return user;
        });
    }
};
LocalStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], LocalStrategy);
exports.LocalStrategy = LocalStrategy;


/***/ }),

/***/ "./apps/api/src/app/categories/categories.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoriesController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const categories_service_1 = __webpack_require__("./apps/api/src/app/categories/categories.service.ts");
const dto_1 = __webpack_require__("./libs/dto/src/index.ts");
let CategoriesController = class CategoriesController {
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    getAll() {
        return this.categoriesService.findAll();
    }
    getById(id) {
        return this.categoriesService.findById(id);
    }
    create(categoryDto) {
        return this.categoriesService.create(categoryDto);
    }
    update(id, categoryDto) {
        return this.categoriesService.update(id, categoryDto);
    }
    remove(id) {
        return this.categoriesService.remove(id);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], CategoriesController.prototype, "getAll", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], CategoriesController.prototype, "getById", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof dto_1.CategoryDto !== "undefined" && dto_1.CategoryDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], CategoriesController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id'),
    tslib_1.__param(0, (0, common_1.Param)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, typeof (_f = typeof dto_1.CategoryDto !== "undefined" && dto_1.CategoryDto) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], CategoriesController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], CategoriesController.prototype, "remove", null);
CategoriesController = tslib_1.__decorate([
    (0, common_1.Controller)('categories'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof categories_service_1.CategoriesService !== "undefined" && categories_service_1.CategoriesService) === "function" ? _a : Object])
], CategoriesController);
exports.CategoriesController = CategoriesController;


/***/ }),

/***/ "./apps/api/src/app/categories/categories.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoriesModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const categories_controller_1 = __webpack_require__("./apps/api/src/app/categories/categories.controller.ts");
const categories_service_1 = __webpack_require__("./apps/api/src/app/categories/categories.service.ts");
const entities_1 = __webpack_require__("./libs/entities/src/index.ts");
let CategoriesModule = class CategoriesModule {
};
CategoriesModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.CategoryEntity])],
        exports: [categories_service_1.CategoriesService],
        controllers: [categories_controller_1.CategoriesController],
        providers: [categories_service_1.CategoriesService],
    })
], CategoriesModule);
exports.CategoriesModule = CategoriesModule;


/***/ }),

/***/ "./apps/api/src/app/categories/categories.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoriesService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const typeorm_2 = __webpack_require__("typeorm");
const entities_1 = __webpack_require__("./libs/entities/src/index.ts");
let CategoriesService = class CategoriesService {
    constructor(categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }
    findAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.categoriesRepository.find();
        });
    }
    findById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.categoriesRepository.findOneBy({ id });
        });
    }
    create(categoryDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let newCategory = new entities_1.CategoryEntity();
            newCategory = Object.assign(Object.assign({}, newCategory), categoryDto);
            return yield this.categoriesRepository.save(newCategory);
        });
    }
    update(id, categoryDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let updatedCategory = yield this.findById(id);
            if (!updatedCategory) {
                return null;
            }
            updatedCategory = Object.assign(Object.assign({}, updatedCategory), categoryDto);
            return yield this.categoriesRepository.save(updatedCategory);
        });
    }
    remove(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const deletedCategory = yield this.findById(id);
            if (!deletedCategory) {
                return null;
            }
            return yield this.categoriesRepository.remove(deletedCategory);
        });
    }
};
CategoriesService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(entities_1.CategoryEntity)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], CategoriesService);
exports.CategoriesService = CategoriesService;


/***/ }),

/***/ "./apps/api/src/app/comments/comments.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommentsController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const comments_service_1 = __webpack_require__("./apps/api/src/app/comments/comments.service.ts");
const dto_1 = __webpack_require__("./libs/dto/src/index.ts");
// import { HelperFileLoader } from '../../utils/HelperFileLoader';
// const PATH_COMMENTS = '/images/';
// const helperFileLoader = new HelperFileLoader();
// helperFileLoader.path = PATH_COMMENTS;
let CommentsController = class CommentsController {
    constructor(commentsService) {
        this.commentsService = commentsService;
    }
    getAllComments({ newsId }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.commentsService.findAllByNews(newsId);
        });
    }
    getById(commentId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.commentsService.findById(commentId);
        });
    }
    create(commentDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.commentsService.create(commentDto);
        });
    }
    update(id, commentDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.commentsService.update(id, commentDto);
        });
    }
    remove(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.commentsService.remove(id);
        });
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__param(0, (0, common_1.Query)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof dto_1.NewsIdDto !== "undefined" && dto_1.NewsIdDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], CommentsController.prototype, "getAllComments", null);
tslib_1.__decorate([
    (0, common_1.Get)(':commentId'),
    tslib_1.__param(0, (0, common_1.Param)('commentId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], CommentsController.prototype, "getById", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof dto_1.CommentDto !== "undefined" && dto_1.CommentDto) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], CommentsController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, typeof (_g = typeof dto_1.CommentDto !== "undefined" && dto_1.CommentDto) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], CommentsController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], CommentsController.prototype, "remove", null);
CommentsController = tslib_1.__decorate([
    (0, common_1.Controller)('comments'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof comments_service_1.CommentsService !== "undefined" && comments_service_1.CommentsService) === "function" ? _a : Object])
], CommentsController);
exports.CommentsController = CommentsController;


/***/ }),

/***/ "./apps/api/src/app/comments/comments.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommentsModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const comments_controller_1 = __webpack_require__("./apps/api/src/app/comments/comments.controller.ts");
const comments_service_1 = __webpack_require__("./apps/api/src/app/comments/comments.service.ts");
const entities_1 = __webpack_require__("./libs/entities/src/index.ts");
const users_module_1 = __webpack_require__("./apps/api/src/app/users/users.module.ts");
const socket_comments_gateway_1 = __webpack_require__("./apps/api/src/app/comments/socket-comments.gateway.ts");
let CommentsModule = class CommentsModule {
};
CommentsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.CommentEntity]), users_module_1.UsersModule],
        exports: [comments_service_1.CommentsService],
        controllers: [comments_controller_1.CommentsController],
        providers: [comments_service_1.CommentsService, socket_comments_gateway_1.SocketCommentsGateway],
    })
], CommentsModule);
exports.CommentsModule = CommentsModule;


/***/ }),

/***/ "./apps/api/src/app/comments/comments.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommentsService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const typeorm_2 = __webpack_require__("typeorm");
const event_emitter_1 = __webpack_require__("@nestjs/event-emitter");
const entities_1 = __webpack_require__("./libs/entities/src/index.ts");
const users_service_1 = __webpack_require__("./apps/api/src/app/users/users.service.ts");
const convertToUserInfo_1 = __webpack_require__("./apps/api/src/app/utils/convertToUserInfo.ts");
const emitter_events_types_1 = __webpack_require__("./libs/emitter-events-types/src/index.ts");
let CommentsService = class CommentsService {
    constructor(commentsRepository, usersService, eventEmitter) {
        this.commentsRepository = commentsRepository;
        this.usersService = usersService;
        this.eventEmitter = eventEmitter;
    }
    findAllByNews(newsId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const comments = [];
            const rootComments = (yield this.commentsRepository.findRoots({ relations: ['user'] }))
                .filter((item) => item.newsId === newsId)
                .sort(this.compareComments);
            for (const comment of rootComments) {
                const orderedComments = yield this.convertTreeToArray(comment);
                comments.push(...orderedComments);
            }
            return comments.map((comment) => {
                comment.user = (0, convertToUserInfo_1.convertToUserInfo)(comment.user);
                return comment;
            });
        });
    }
    findById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const comment = yield this.commentsRepository.findOne({
                where: { id },
                relations: ['user'],
            });
            comment.user = (0, convertToUserInfo_1.convertToUserInfo)(comment.user);
            return comment;
        });
    }
    create(commentDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let newComment = new entities_1.CommentEntity();
            const user = yield this.usersService.findById(commentDto.userId);
            if (!user) {
                return null;
            }
            if (commentDto.parentId) {
                newComment.parent = yield this.findById(commentDto.parentId);
            }
            newComment = Object.assign(Object.assign(Object.assign({}, newComment), commentDto), { user });
            newComment = yield this.commentsRepository.save(newComment);
            newComment.user = (0, convertToUserInfo_1.convertToUserInfo)(newComment.user);
            this.eventEmitter.emit('comment.create', new emitter_events_types_1.EmitterEventDto('comment-create', newComment.newsId.toString(), {
                entityId: newComment.id,
                userId: newComment.user.id,
                message: `${newComment.user.email} has created a new message`,
            }));
            return newComment;
        });
    }
    update(id, commentDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersService.findById(commentDto.userId);
            if (!user) {
                return null;
            }
            let updatedComment = yield this.findById(id);
            if (!updatedComment) {
                return null;
            }
            updatedComment = Object.assign(Object.assign(Object.assign({}, updatedComment), commentDto), { user });
            updatedComment = yield this.commentsRepository.save(updatedComment);
            updatedComment.user = (0, convertToUserInfo_1.convertToUserInfo)(updatedComment.user);
            this.eventEmitter.emit('comment.edited', new emitter_events_types_1.EmitterEventDto('comment-edited', updatedComment.newsId.toString(), {
                entityId: updatedComment.id,
                userId: updatedComment.user.id,
                message: `${updatedComment.user.email} has edited a message`,
            }));
            return updatedComment;
        });
    }
    remove(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let deletedComment = yield this.findById(id);
            if (!deletedComment) {
                return null;
            }
            deletedComment = yield this.commentsRepository.remove(deletedComment);
            deletedComment.user = (0, convertToUserInfo_1.convertToUserInfo)(deletedComment.user);
            this.eventEmitter.emit('comment.deleted', new emitter_events_types_1.EmitterEventDto('comment-deleted', deletedComment.newsId.toString(), {
                entityId: deletedComment.id,
                userId: deletedComment.user.id,
                message: `${deletedComment.user.email} has deleted a message`,
            }));
            return deletedComment;
        });
    }
    removeAllByNews(newsId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let commentsByNews = yield this.findAllByNews(newsId);
            if (!commentsByNews.length) {
                return [];
            }
            commentsByNews = yield this.commentsRepository.remove(commentsByNews);
            return commentsByNews.map((comment) => {
                comment.user = (0, convertToUserInfo_1.convertToUserInfo)(comment.user);
                return comment;
            });
        });
    }
    compareComments(item1, item2) {
        return item1.createdAt.getTime() - item2.createdAt.getTime();
    }
    convertTreeToArray(parent, arr) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            arr = arr || [];
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { children: _children } = parent, _parent = tslib_1.__rest(parent, ["children"]);
            arr.push(_parent);
            const commentsTree = yield this.commentsRepository.findDescendantsTree(parent, {
                depth: 1,
                relations: ['user'],
            });
            const children = commentsTree.children.sort(this.compareComments);
            for (const comment of children) {
                yield this.convertTreeToArray(comment, arr);
            }
            return arr;
        });
    }
};
CommentsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(entities_1.CommentEntity)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.TreeRepository !== "undefined" && typeorm_2.TreeRepository) === "function" ? _a : Object, typeof (_b = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _b : Object, typeof (_c = typeof event_emitter_1.EventEmitter2 !== "undefined" && event_emitter_1.EventEmitter2) === "function" ? _c : Object])
], CommentsService);
exports.CommentsService = CommentsService;


/***/ }),

/***/ "./apps/api/src/app/comments/socket-comments.gateway.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SocketCommentsGateway = void 0;
const tslib_1 = __webpack_require__("tslib");
const websockets_1 = __webpack_require__("@nestjs/websockets");
const event_emitter_1 = __webpack_require__("@nestjs/event-emitter");
const socket_io_1 = __webpack_require__("socket.io");
const emitter_events_types_1 = __webpack_require__("./libs/emitter-events-types/src/index.ts");
let SocketCommentsGateway = class SocketCommentsGateway {
    handleJoinRoomClient({ newsId }, client) {
        client.join(newsId);
    }
    handleLeaveRoomClient({ newsId }, client) {
        client.leave(newsId);
    }
    // @SubscribeMessage('comment-create')
    // handleCreateComment(
    //   @MessageBody() { data }: CreateCommentData,
    //   @ConnectedSocket() client: Socket
    // ): void {
    //   const room = data.newsId.toString();
    // //  broadcast to a room from a given socket (client) excluding the sender
    //   client.to(room).emit('comment-create', data);
    // }
    handleCommentEvents({ type, roomId, payload }) {
        this.server.to(roomId).emit(type, payload);
    }
};
tslib_1.__decorate([
    (0, websockets_1.WebSocketServer)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _a : Object)
], SocketCommentsGateway.prototype, "server", void 0);
tslib_1.__decorate([
    (0, websockets_1.SubscribeMessage)('room-join'),
    tslib_1.__param(0, (0, websockets_1.MessageBody)()),
    tslib_1.__param(1, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_b = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], SocketCommentsGateway.prototype, "handleJoinRoomClient", null);
tslib_1.__decorate([
    (0, websockets_1.SubscribeMessage)('room-leave'),
    tslib_1.__param(0, (0, websockets_1.MessageBody)()),
    tslib_1.__param(1, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_c = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], SocketCommentsGateway.prototype, "handleLeaveRoomClient", null);
tslib_1.__decorate([
    (0, event_emitter_1.OnEvent)('comment.*'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof emitter_events_types_1.EmitterEvent !== "undefined" && emitter_events_types_1.EmitterEvent) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], SocketCommentsGateway.prototype, "handleCommentEvents", null);
SocketCommentsGateway = tslib_1.__decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    })
], SocketCommentsGateway);
exports.SocketCommentsGateway = SocketCommentsGateway;


/***/ }),

/***/ "./apps/api/src/app/news/news.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NewsController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
// import { ApiTags, ApiResponse } from '@nestjs/swagger';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
const news_service_1 = __webpack_require__("./apps/api/src/app/news/news.service.ts");
const dto_1 = __webpack_require__("./libs/dto/src/index.ts");
// import { HelperFileLoader } from '../utils/HelperFileLoader';
// import { FileTypeValidator } from '../utils/FileTypeValidator';
// import { MailService } from '../mail/mail.service';
const jwt_auth_guard_1 = __webpack_require__("./apps/api/src/app/auth/jwt-auth.guard.ts");
// const PATH_NEWS = '/images/';
// const helperFileLoader = new HelperFileLoader();
// helperFileLoader.path = PATH_NEWS;
// const fileValidator = new FileTypeValidator();
// @ApiTags('api/news')
let NewsController = class NewsController {
    constructor(newsService) {
        this.newsService = newsService;
    }
    getAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.newsService.findAll();
        });
    }
    getById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return this.newsService.findById(id);
            }
            catch (err) {
                throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    create(newsDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.newsService.create(newsDto);
        });
    }
    // @Post('upload')
    // @UseInterceptors(
    //   FileInterceptor('file', {
    //     storage: diskStorage({
    //       destination: helperFileLoader.destinationPath,
    //       filename: helperFileLoader.customFileName,
    //     }),
    //     fileFilter: fileValidator.fileFilter,
    //   })
    // )
    // async uploadImage(
    //   @Req() req,
    //   @UploadedFile() file: Express.Multer.File
    // ): Promise<string> {
    //   if (req.fileValidationError) {
    //     throw new HttpException(req.fileValidationError, HttpStatus.BAD_REQUEST);
    //   }
    //   return `${file.originalname} has been loaded!`;
    // }
    update(id, newsDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.newsService.update(id, newsDto);
        });
    }
    remove(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.newsService.remove(id);
        });
    }
};
tslib_1.__decorate([
    (0, common_1.Get)()
    // @ApiResponse({
    //   status: 200,
    //   description: 'The news have been successfully found.',
    // })
    ,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], NewsController.prototype, "getAll", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id')
    // @ApiResponse({
    //   status: 200,
    //   description: 'The news has been successfully found.',
    // })
    // @ApiResponse({
    //   status: 500,
    //   description: 'Internal server error. ID maybe is not correct.',
    // })
    ,
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], NewsController.prototype, "getById", null);
tslib_1.__decorate([
    (0, common_1.Post)()
    // @ApiResponse({
    //   status: 201,
    //   description: 'The news has been successfully created.',
    // })
    // @ApiResponse({
    //   status: 400,
    //   description: 'Data validation has been failed.',
    // })
    ,
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof dto_1.NewsDto !== "undefined" && dto_1.NewsDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], NewsController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Put)(':id')
    // @ApiResponse({
    //   status: 200,
    //   description: 'The news has been successfully updated.',
    // })
    // @ApiResponse({
    //   status: 400,
    //   description: 'Data validation has been failed.',
    // })
    // @ApiResponse({
    //   status: 500,
    //   description: 'Internal server error. ID maybe is not correct.',
    // })
    ,
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, typeof (_f = typeof dto_1.NewsDto !== "undefined" && dto_1.NewsDto) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], NewsController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id')
    // @ApiResponse({
    //   status: 200,
    //   description: 'The news has been successfully removed.',
    // })
    ,
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], NewsController.prototype, "remove", null);
NewsController = tslib_1.__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('news'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof news_service_1.NewsService !== "undefined" && news_service_1.NewsService) === "function" ? _a : Object])
], NewsController);
exports.NewsController = NewsController;


/***/ }),

/***/ "./apps/api/src/app/news/news.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NewsModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const news_controller_1 = __webpack_require__("./apps/api/src/app/news/news.controller.ts");
const news_service_1 = __webpack_require__("./apps/api/src/app/news/news.service.ts");
const entities_1 = __webpack_require__("./libs/entities/src/index.ts");
const users_module_1 = __webpack_require__("./apps/api/src/app/users/users.module.ts");
const categories_module_1 = __webpack_require__("./apps/api/src/app/categories/categories.module.ts");
const comments_module_1 = __webpack_require__("./apps/api/src/app/comments/comments.module.ts");
let NewsModule = class NewsModule {
};
NewsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([entities_1.NewsEntity]),
            users_module_1.UsersModule,
            categories_module_1.CategoriesModule,
            comments_module_1.CommentsModule,
        ],
        controllers: [news_controller_1.NewsController],
        providers: [news_service_1.NewsService],
    })
], NewsModule);
exports.NewsModule = NewsModule;


/***/ }),

/***/ "./apps/api/src/app/news/news.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NewsService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const typeorm_2 = __webpack_require__("typeorm");
const entities_1 = __webpack_require__("./libs/entities/src/index.ts");
const users_service_1 = __webpack_require__("./apps/api/src/app/users/users.service.ts");
const categories_service_1 = __webpack_require__("./apps/api/src/app/categories/categories.service.ts");
const comments_service_1 = __webpack_require__("./apps/api/src/app/comments/comments.service.ts");
const convertToUserInfo_1 = __webpack_require__("./apps/api/src/app/utils/convertToUserInfo.ts");
const SELECT_FIELDS = [
    'news.id',
    'news.title',
    'news.description',
    'news.cover',
    'news.createdAt',
    'news.updatedAt',
    'users.id',
    'users.firstName',
    'users.lastName',
    'users.email',
    'users.avatar',
    'categories.id',
    'categories.name',
];
let NewsService = class NewsService {
    constructor(newsRepository, usersService, categoriesService, commentsService) {
        this.newsRepository = newsRepository;
        this.usersService = usersService;
        this.categoriesService = categoriesService;
        this.commentsService = commentsService;
    }
    findAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.newsRepository
                .createQueryBuilder('news')
                .select(SELECT_FIELDS)
                .leftJoin('news.author', 'users')
                .leftJoin('news.category', 'categories')
                .getMany();
        });
    }
    findById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.newsRepository
                .createQueryBuilder('news')
                .where({ id })
                .select(SELECT_FIELDS)
                .leftJoin('news.author', 'users')
                .leftJoin('news.category', 'categories')
                .getOne();
        });
    }
    findByAuthorId(authorId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.newsRepository
                .createQueryBuilder('news')
                .where({ author: { id: authorId } })
                .select(SELECT_FIELDS)
                .leftJoin('news.author', 'users')
                .leftJoin('news.category', 'categories')
                .getMany();
        });
    }
    create(newsDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const author = yield this.usersService.findById(newsDto.authorId);
            if (!author) {
                return null;
            }
            const category = yield this.categoriesService.findById(newsDto.categoryId);
            if (!category) {
                return null;
            }
            let newNews = new entities_1.NewsEntity();
            newNews = Object.assign(Object.assign(Object.assign({}, newNews), newsDto), { author,
                category });
            newNews = yield this.newsRepository.save(newNews);
            newNews.author = (0, convertToUserInfo_1.convertToUserInfo)(newNews.author);
            return newNews;
        });
    }
    update(id, newsDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const author = yield this.usersService.findById(newsDto.authorId);
            if (!author) {
                return null;
            }
            const category = yield this.categoriesService.findById(newsDto.categoryId);
            if (!category) {
                return null;
            }
            let updatedNews = yield this.findById(id);
            if (!updatedNews) {
                return null;
            }
            updatedNews = Object.assign(Object.assign(Object.assign({}, updatedNews), newsDto), { author,
                category });
            updatedNews = yield this.newsRepository.save(updatedNews);
            updatedNews.author = (0, convertToUserInfo_1.convertToUserInfo)(updatedNews.author);
            return updatedNews;
        });
    }
    remove(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let deletedNews = yield this.findById(id);
            if (!deletedNews) {
                return null;
            }
            yield this.commentsService.removeAllByNews(deletedNews.id);
            deletedNews = yield this.newsRepository.remove(deletedNews);
            deletedNews.author = (0, convertToUserInfo_1.convertToUserInfo)(deletedNews.author);
            return deletedNews;
        });
    }
};
NewsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(entities_1.NewsEntity)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _b : Object, typeof (_c = typeof categories_service_1.CategoriesService !== "undefined" && categories_service_1.CategoriesService) === "function" ? _c : Object, typeof (_d = typeof comments_service_1.CommentsService !== "undefined" && comments_service_1.CommentsService) === "function" ? _d : Object])
], NewsService);
exports.NewsService = NewsService;


/***/ }),

/***/ "./apps/api/src/app/users/users.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const users_service_1 = __webpack_require__("./apps/api/src/app/users/users.service.ts");
const dto_1 = __webpack_require__("./libs/dto/src/index.ts");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    getAll() {
        return this.usersService.findAll();
    }
    getById(id) {
        return this.usersService.findById(id);
    }
    create(userDto) {
        return this.usersService.create(userDto);
    }
    update(id, userDto) {
        return this.usersService.update(id, userDto);
    }
    remove(id) {
        return this.usersService.remove(id);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], UsersController.prototype, "getAll", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], UsersController.prototype, "getById", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof dto_1.CreateUserDto !== "undefined" && dto_1.CreateUserDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], UsersController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, typeof (_f = typeof dto_1.UpdateUserDto !== "undefined" && dto_1.UpdateUserDto) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], UsersController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], UsersController.prototype, "remove", null);
UsersController = tslib_1.__decorate([
    (0, common_1.Controller)('users'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object])
], UsersController);
exports.UsersController = UsersController;


/***/ }),

/***/ "./apps/api/src/app/users/users.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const users_controller_1 = __webpack_require__("./apps/api/src/app/users/users.controller.ts");
const users_service_1 = __webpack_require__("./apps/api/src/app/users/users.service.ts");
const entities_1 = __webpack_require__("./libs/entities/src/index.ts");
let UsersModule = class UsersModule {
};
UsersModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.UserEntity])],
        exports: [users_service_1.UsersService, typeorm_1.TypeOrmModule.forFeature([entities_1.UserEntity])],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService],
    })
], UsersModule);
exports.UsersModule = UsersModule;


/***/ }),

/***/ "./apps/api/src/app/users/users.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const typeorm_2 = __webpack_require__("typeorm");
const entities_1 = __webpack_require__("./libs/entities/src/index.ts");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    findAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.usersRepository.find();
        });
    }
    findById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.usersRepository.findOneBy({ id });
        });
    }
    findByEmail(email) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.usersRepository.findOneBy({ email });
        });
    }
    create(userDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let newUser = new entities_1.UserEntity();
            newUser = Object.assign(Object.assign(Object.assign({}, newUser), userDto), { role: 'user' });
            return yield this.usersRepository.save(newUser);
        });
    }
    update(id, userDto) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let updatedUser = yield this.findById(id);
            if (!updatedUser) {
                return null;
            }
            updatedUser = Object.assign(Object.assign({}, updatedUser), userDto);
            return yield this.usersRepository.save(updatedUser);
        });
    }
    remove(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const deletedUser = yield this.findById(id);
            if (!deletedUser) {
                return null;
            }
            return yield this.usersRepository.remove(deletedUser);
        });
    }
};
UsersService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(entities_1.UserEntity)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], UsersService);
exports.UsersService = UsersService;


/***/ }),

/***/ "./apps/api/src/app/utils/convertToUserInfo.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.convertToUserInfo = void 0;
function convertToUserInfo(user) {
    return (({ id, firstName, lastName, email, avatar }) => ({
        id,
        firstName,
        lastName,
        email,
        avatar,
    }))(user);
}
exports.convertToUserInfo = convertToUserInfo;


/***/ }),

/***/ "./libs/dto/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/dto/src/lib/user/create-user.dto.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/dto/src/lib/user/update-user.dto.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/dto/src/lib/news/news.dto.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/dto/src/lib/category/category.dto.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/dto/src/lib/comment/comment.dto.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/dto/src/lib/comment/news-id.dto.ts"), exports);


/***/ }),

/***/ "./libs/dto/src/lib/category/category.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoryDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_validator_1 = __webpack_require__("class-validator");
class CategoryDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CategoryDto.prototype, "name", void 0);
exports.CategoryDto = CategoryDto;


/***/ }),

/***/ "./libs/dto/src/lib/comment/comment.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommentDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_validator_1 = __webpack_require__("class-validator");
class CommentDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], CommentDto.prototype, "parentId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], CommentDto.prototype, "newsId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], CommentDto.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CommentDto.prototype, "message", void 0);
exports.CommentDto = CommentDto;


/***/ }),

/***/ "./libs/dto/src/lib/comment/news-id.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NewsIdDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_validator_1 = __webpack_require__("class-validator");
const class_transformer_1 = __webpack_require__("class-transformer");
class NewsIdDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    tslib_1.__metadata("design:type", Number)
], NewsIdDto.prototype, "newsId", void 0);
exports.NewsIdDto = NewsIdDto;


/***/ }),

/***/ "./libs/dto/src/lib/news/news.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NewsDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_validator_1 = __webpack_require__("class-validator");
class NewsDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], NewsDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], NewsDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], NewsDto.prototype, "categoryId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], NewsDto.prototype, "authorId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], NewsDto.prototype, "cover", void 0);
exports.NewsDto = NewsDto;


/***/ }),

/***/ "./libs/dto/src/lib/user/create-user.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateUserDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_validator_1 = __webpack_require__("class-validator");
class CreateUserDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
exports.CreateUserDto = CreateUserDto;


/***/ }),

/***/ "./libs/dto/src/lib/user/update-user.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateUserDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_validator_1 = __webpack_require__("class-validator");
class UpdateUserDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpdateUserDto.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpdateUserDto.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpdateUserDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpdateUserDto.prototype, "role", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpdateUserDto.prototype, "avatar", void 0);
exports.UpdateUserDto = UpdateUserDto;


/***/ }),

/***/ "./libs/emitter-events-types/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/emitter-events-types/src/lib/emitter-event-type.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/emitter-events-types/src/lib/emitter-event.interface.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/emitter-events-types/src/lib/emitter-event.dto.ts"), exports);


/***/ }),

/***/ "./libs/emitter-events-types/src/lib/emitter-event-type.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/emitter-events-types/src/lib/emitter-event.dto.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmitterEventDto = void 0;
class EmitterEventDto {
    constructor(type, roomId, payload) {
        this.type = type;
        this.roomId = roomId;
        this.payload = payload;
    }
}
exports.EmitterEventDto = EmitterEventDto;


/***/ }),

/***/ "./libs/emitter-events-types/src/lib/emitter-event.interface.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/entities/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/entities/src/lib/user.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/entities/src/lib/news.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/entities/src/lib/category.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/entities/src/lib/comment.entity.ts"), exports);


/***/ }),

/***/ "./libs/entities/src/lib/category.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoryEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
let CategoryEntity = class CategoryEntity {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], CategoryEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], CategoryEntity.prototype, "name", void 0);
CategoryEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('categories')
], CategoryEntity);
exports.CategoryEntity = CategoryEntity;


/***/ }),

/***/ "./libs/entities/src/lib/comment.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommentEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const interfaces_1 = __webpack_require__("./libs/interfaces/src/index.ts");
const user_entity_1 = __webpack_require__("./libs/entities/src/lib/user.entity.ts");
let CommentEntity = class CommentEntity {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], CommentEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.TreeParent)(),
    tslib_1.__metadata("design:type", CommentEntity)
], CommentEntity.prototype, "parent", void 0);
tslib_1.__decorate([
    (0, typeorm_1.TreeChildren)(),
    tslib_1.__metadata("design:type", Array)
], CommentEntity.prototype, "children", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], CommentEntity.prototype, "message", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], CommentEntity.prototype, "newsId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.id),
    tslib_1.__metadata("design:type", typeof (_a = typeof interfaces_1.UserInfo !== "undefined" && interfaces_1.UserInfo) === "function" ? _a : Object)
], CommentEntity.prototype, "user", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], CommentEntity.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], CommentEntity.prototype, "updatedAt", void 0);
CommentEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('comments'),
    (0, typeorm_1.Tree)('materialized-path')
], CommentEntity);
exports.CommentEntity = CommentEntity;


/***/ }),

/***/ "./libs/entities/src/lib/news.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NewsEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const interfaces_1 = __webpack_require__("./libs/interfaces/src/index.ts");
const user_entity_1 = __webpack_require__("./libs/entities/src/lib/user.entity.ts");
const category_entity_1 = __webpack_require__("./libs/entities/src/lib/category.entity.ts");
let NewsEntity = class NewsEntity {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], NewsEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], NewsEntity.prototype, "title", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], NewsEntity.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], NewsEntity.prototype, "cover", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.CategoryEntity, (category) => category.id),
    tslib_1.__metadata("design:type", typeof (_a = typeof category_entity_1.CategoryEntity !== "undefined" && category_entity_1.CategoryEntity) === "function" ? _a : Object)
], NewsEntity.prototype, "category", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.id),
    tslib_1.__metadata("design:type", typeof (_b = typeof interfaces_1.UserInfo !== "undefined" && interfaces_1.UserInfo) === "function" ? _b : Object)
], NewsEntity.prototype, "author", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], NewsEntity.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    tslib_1.__metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], NewsEntity.prototype, "updatedAt", void 0);
NewsEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('news')
], NewsEntity);
exports.NewsEntity = NewsEntity;


/***/ }),

/***/ "./libs/entities/src/lib/user.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
let UserEntity = class UserEntity {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], UserEntity.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], UserEntity.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], UserEntity.prototype, "role", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], UserEntity.prototype, "avatar", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], UserEntity.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], UserEntity.prototype, "updatedAt", void 0);
UserEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('users')
], UserEntity);
exports.UserEntity = UserEntity;


/***/ }),

/***/ "./libs/interfaces/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/interfaces/src/lib/user.interface.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/interfaces/src/lib/user-info.interface.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/interfaces/src/lib/news.interface.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/interfaces/src/lib/category.interface.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/interfaces/src/lib/comment.interface.ts"), exports);


/***/ }),

/***/ "./libs/interfaces/src/lib/category.interface.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/interfaces/src/lib/comment.interface.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/interfaces/src/lib/news.interface.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/interfaces/src/lib/user-info.interface.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/interfaces/src/lib/user.interface.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "@nestjs/common":
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/event-emitter":
/***/ ((module) => {

module.exports = require("@nestjs/event-emitter");

/***/ }),

/***/ "@nestjs/jwt":
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/jwt/dist":
/***/ ((module) => {

module.exports = require("@nestjs/jwt/dist");

/***/ }),

/***/ "@nestjs/passport":
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "@nestjs/typeorm":
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "@nestjs/websockets":
/***/ ((module) => {

module.exports = require("@nestjs/websockets");

/***/ }),

/***/ "class-transformer":
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),

/***/ "class-validator":
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "cookie-parser":
/***/ ((module) => {

module.exports = require("cookie-parser");

/***/ }),

/***/ "passport-jwt":
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),

/***/ "passport-local":
/***/ ((module) => {

module.exports = require("passport-local");

/***/ }),

/***/ "socket.io":
/***/ ((module) => {

module.exports = require("socket.io");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "typeorm":
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),

/***/ "path":
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const path_1 = __webpack_require__("path");
const common_2 = __webpack_require__("@nestjs/common");
const cookieParser = __webpack_require__("cookie-parser");
const app_module_1 = __webpack_require__("./apps/api/src/app/app.module.ts");
function bootstrap() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        app.enableCors({
            origin: true,
            credentials: true,
        });
        // const globalPrefix = 'api';
        const globalPrefix = '';
        app.setGlobalPrefix(globalPrefix);
        app.use(cookieParser());
        app.useStaticAssets((0, path_1.join)(__dirname, 'assets'));
        app.useGlobalPipes(new common_2.ValidationPipe({
            whitelist: true,
            transform: true,
        }));
        const port = process.env.PORT || 3333;
        yield app.listen(port);
        common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
    });
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map