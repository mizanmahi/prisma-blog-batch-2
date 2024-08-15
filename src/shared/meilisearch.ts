import { MeiliSearch } from 'meilisearch';

const meiliClient = new MeiliSearch({
   host: 'http://localhost:7700',
   apiKey: 'aSampleMasterKey',
});

export const deleteResourceFromMeili = async (indexKey: string, id: string) => {
   const index = meiliClient.index(indexKey);

   try {
      await index.deleteDocument(id);
      console.log(
         `Resource with ID ${id} deleted successfully from MeiliSearch.`
      );
   } catch (error) {
      console.error('Error deleting resource from MeiliSearch:', error);
   }
};

export default meiliClient;
