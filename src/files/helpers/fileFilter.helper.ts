export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callBack: Function
) => {
  console.log({ file })

  callBack(null, true)
}
