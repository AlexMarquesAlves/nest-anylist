import { Logger } from '@nestjs/common'

export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callBack: Function
) => {
  // console.log({ file })
  if (!file) return callBack(new Logger.error(`Field file is empty`), false)

  const fileExtension = file.mimetype.split('/')[1]
  const validExtensions = ['jpg', 'jpeg', 'png', 'gif']

  if (validExtensions.includes(fileExtension)) {
    return callBack(null, true)
  }

  callBack(null, false)
}
