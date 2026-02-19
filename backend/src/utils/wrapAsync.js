export default function wrapAsync(fnx) {
  return function (req, res, next){
    Promise.resolve(fnx(req, res, next).catch(next));
  }
};















