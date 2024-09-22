"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteResourceFromMeili = void 0;
const meilisearch_1 = require("meilisearch");
const meiliClient = new meilisearch_1.MeiliSearch({
    host: 'http://localhost:7700',
    apiKey: 'aSampleMasterKey',
});
const deleteResourceFromMeili = (indexKey, id) => __awaiter(void 0, void 0, void 0, function* () {
    const index = meiliClient.index(indexKey);
    try {
        yield index.deleteDocument(id);
        console.log(`Resource with ID ${id} deleted successfully from MeiliSearch.`);
    }
    catch (error) {
        console.error('Error deleting resource from MeiliSearch:', error);
    }
});
exports.deleteResourceFromMeili = deleteResourceFromMeili;
exports.default = meiliClient;
