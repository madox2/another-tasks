let logger = () => 0
if (process.env.NODE_ENV === 'development') {
  logger = console.log
}

export const log = logger
