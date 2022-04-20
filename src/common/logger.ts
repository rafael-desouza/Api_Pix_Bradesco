import { createLogger, transports, Logger, format } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import { formatDate } from './date/dateFormatter'

/**
 * Create a logger class
 */
export class LoggerFactory {
  public logger: Logger

  /**
   * Create a logger instance
   */
  static get Instance(): LoggerFactory {
    return new LoggerFactory()
  }

  /**
   * Creating a custom format
   */
  private format = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  )

  /**
   * Parsing date
   */
  private yearMonthDay = () => {
    return formatDate(new Date(), 'YYYY-MM-DD')
  }

  public constructor() {
    const defaultSizeLimitLog = '20m'

    const dailyTransport: DailyRotateFile = new DailyRotateFile({
      filename: './logs/info/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: defaultSizeLimitLog,
      maxFiles: '14d'
    })

    this.logger = createLogger({
      format: this.format,
      transports: [new transports.Console(), dailyTransport],
      exceptionHandlers: [new transports.File({ filename: `./logs/exceptions/application-${this.yearMonthDay()}.log` })]
    })
  }

  info(message: string) {
    this.logger.info(message)
  }

  warn(message: string) {
    this.logger.warn(message)
  }

  error(message: string) {
    this.logger.error(message)
  }

  http(message: string) {
    this.logger.http(message)
  }
}

export const logger = LoggerFactory.Instance
