import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseWrapperInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const handler = next.handle();
    return handler.pipe(
      map((data) => {
        // const request = context.switchToHttp().getRequest<Request>();
        // const response = context.switchToHttp().getResponse<Response>();
        return {
          timestamp: Date.now(),
          data,
        };
      }),
    );
  }
}
