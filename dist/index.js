"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const fs = __importStar(require("fs"));
function default_1(source) {
    const uniqueClassnames = (0, utils_1.findUniqueClassnames)(source);
    const tsCode = (0, utils_1.generateTsCode)(uniqueClassnames);
    const targetTsFilePath = `${this.resourcePath}.d.ts`;
    console.log(`Generated ts type definition file at path: ${targetTsFilePath}`);
    fs.writeFileSync(targetTsFilePath, tsCode, "utf-8"
    // ,() => {
    //   console.log(`Generated ts type definition file at path: ${targetTsFilePath}`);
    // }
    );
    return source;
}
exports.default = default_1;
