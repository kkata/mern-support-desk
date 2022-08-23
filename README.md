[React Front To Back 2022](https://www.udemy.com/course/react-front-to-back-2022/) Fullstack MERN アプリを TypeScript でやってみた。  
一通り完了：https://github.com/kkata/mern-support-desk/tree/finished。

- [MongoDB](https://www.mongodb.com/ja-jp)
- [Express](https://expressjs.com/ja/)
- [React](https://ja.reactjs.org/)
- [Node.js](https://nodejs.org/ja/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [TypeScript](https://www.typescriptlang.org/)

## 開発

`.env` に環境変数を設定

```
NODE_ENV=development
PORT=5000

MONGO_URI=""

JWT_SECRET=""
```

## 参考

heroku と DB が接続できない場合  
[Connecting your Heroku app to Atlas](https://www.berato.tech/connecting-your-heroku-app-to-atlas)

createAsyncThunk 関係

- [Redux Essentials, Part 5: Async Logic and Data Fetching | Redux](https://redux.js.org/tutorials/essentials/part-5-async-logic#thunks-and-async-logic)
- [Usage With TypeScript | Redux Toolkit](https://redux-toolkit.js.org/usage/usage-with-typescript#createasyncthunk)
- [Redux Toolkit で Async Thunk が曲者なので詳しく解説する - HRBrain Blog](https://times.hrbrain.co.jp/entry/2020/12/08/redux-toolkit-async-thunk)
- [createAsyncThunk の型パラメータで苦戦した話](https://zenn.dev/luvmini511/articles/c9cdb77a145f4d)
