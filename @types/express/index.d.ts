// req.user が使えるようにする。
declare namespace Express {
  export interface Request {
    user:
      | (Document<
          unknown,
          any,
          {
            name: string;
            email: string;
            password: string;
            isAdmin: boolean;
          }
        > & {
          name: string;
          email: string;
          password: string;
          isAdmin: boolean;
        } & {
          _id: Types.ObjectId;
        })
      | null;
  }
}
// ref. https://qiita.com/m-dove/items/1674e23263d7dfc88917
// https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript/58788706
