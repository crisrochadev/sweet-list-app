import { ref, $db} from 'vue'

export function useDb(){

}
// export default {
//     data() {
//       return {
//         items: [],
//         data: {
//           item: null,
//           quantity: 1,
//           added: false,
//           price: 0,
//         },
//         collection: "items",
//       };
//     },
//     methods: {
//       async addItem(item) {
//         this.data.item = item;
//         try {
//           const res = await this.db
//             .collection(this.collection)
//             .add(this.convertData());
//           await this.getItems();
//           return res;
//         } catch (error) {
//           console.error(error);
//           return error;
//         }
//       },
//       async getItems() {
//         try {
//           const res = await this.db
//             .collection(this.collection)
//             .get({ keys: true });
//           this.items = res.map((item) => ({
//             ...item.data,
//             key: item.key,
//           }));
//         } catch (error) {
//           console.error(error);
//         }
//       },
//       async deleteItem(key) {
//         try {
//           const res = await this.db
//             .collection(this.collection)
//             .doc(key)
//             .delete();
//           await this.getItems();
//           return res;
//         } catch (error) {
//           console.error(error);
//           return error;
//         }
//       },
//       async updateItem(key, item) {
//         try {
//           const res = await this.db
//             .collection(this.collection)
//             .doc(key)
//             .update(item);
//           await this.getItems();
//           return res;
//         } catch (error) {
//           console.error(error);
//           return error;
//         }
//       },
//       convertData() {
//         return JSON.parse(JSON.stringify(this.data));
//       },
//     },
// }
