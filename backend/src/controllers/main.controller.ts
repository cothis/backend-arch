import { Response } from 'express';
import { Controller, Get, Res } from 'routing-controllers';
import { Service } from 'typedi';
import { MainService } from '../services/main.service';

@Controller('/')
@Service()
export class MainController {
  constructor(private mainService: MainService) {}

  @Get('/')
  public async home(@Res() res: Response) {
    const message = this.mainService.welcomeMessage();
    return res.status(200).send(message);
  }
}
