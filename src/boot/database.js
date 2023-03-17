import Localbase from 'localbase';




const db = new Localbase('sweet-list');
export default async ({ app }) => {
  app.config.globalProperties.$db = db
}

export { db}

