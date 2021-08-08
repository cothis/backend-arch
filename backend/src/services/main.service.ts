import { Service } from 'typedi';

@Service()
export class MainService {
  welcomeMessage() {
    return 'Hello World';
  }
}
